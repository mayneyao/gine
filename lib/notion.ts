import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { md } from "./markdown";
import { cache } from "react";

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("bookmark", async (block: any) => {
  return `[${block.bookmark.url}](${block.bookmark.url})`;
});
// { type: 'table_of_contents', parent: '', children: [] },
n2m.setCustomTransformer("table_of_contents", async (block: any) => {
  return "[[toc]]";
});

n2m.setCustomTransformer("image", async (block: any) => {
  const blockId = block.id;
  const url = `https://notion-image-proxy.gine.me/${blockId}`;
  return `![${blockId}](${url})`;
});

export const notionPage2html = cache(async (slug: string) => {
  const mdblocks = await n2m.pageToMarkdown(slug);
  const mdString = n2m.toMarkdownString(mdblocks);
  return md.render(mdString);
});

const splitSlug = (slug: string) => {
  // 567e61404a9343a39acdfcfeb359eb89 to 567e6140-4a93-43a3-9acd-fcfeb359eb89
  slug = slug.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  return slug;
};

const makeSlugRight = (slug: string) => {
  // 567e6140-4a93-43a3-9acd-fcfeb359eb89 to 567e61404a9343a39acdfcfeb359eb89
  if (slug.length === 32) return splitSlug(slug);
  return slug;
};

export const getPageMeta = cache(async (slug: string) => {
  const response = await notion.pages.retrieve({
    page_id: splitSlug(slug),
  });
  return properties2Object((response as PageObjectResponse).properties);
});

const properties2Object = (properties: PageObjectResponse["properties"]) => {
  const entry = Object.entries(properties).map(([key, value]) => {
    // code below is co-authored with Github Copilot
    switch (value.type) {
      case "title":
        return [key, value.title[0]?.plain_text];
      case "rich_text":
        return [key, value.rich_text[0]?.plain_text];
      case "date":
        return [key, value.date?.start];
      case "select":
        return [key, value.select?.name];
      case "multi_select":
        return [key, value.multi_select?.map((item) => item.name)];
      case "status":
        return [key, value.status];
      case "number":
        return [key, value.number];
      case "people":
        return [
          key,
          value.people?.map((item) => (item as UserObjectResponse).name),
        ];
      case "files":
        return [key, value.files?.map((item) => item.name)];
      case "checkbox":
        return [key, value.checkbox];
      case "url":
        return [key, value.url];
      case "email":
        return [key, value.email];
      case "phone_number":
        return [key, value.phone_number];
      case "formula":
        switch (value.formula.type) {
          case "string":
            return [key, value.formula.string];
          case "number":
            return [key, value.formula.number];
          case "boolean":
            return [key, value.formula.boolean];
          case "date":
            return [key, value.formula.date?.start];
        }
      case "relation":
        return [key, value.relation?.map((item) => item.id)];
      case "rollup":
        switch (value.rollup.type) {
          case "number":
            return [key, value.rollup.number];
          case "date":
            return [key, value.rollup.date?.start];
          case "array":
            return [key, value.rollup.array];
        }
      case "created_time":
        return [key, value.created_time];
      case "created_by":
        return [key, (value.created_by as UserObjectResponse).name];
      case "last_edited_time":
        return [key, value.last_edited_time];
      case "last_edited_by":
        return [key, (value.last_edited_by as UserObjectResponse)?.name];
      default:
        return [key, value];
    }
  });
  return Object.fromEntries(entry);
};

// cache next function
export const getPostList = cache(async (postDatabaseId: string) => {
  const response = await notion.databases.query({
    database_id: makeSlugRight(postDatabaseId),
    filter: {
      and: [
        {
          property: "status",
          status: {
            equals: "published",
          },
        },
        {
          property: "keep",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [],
  });
  return response.results.map((item) => {
    return {
      id: item.id,
      properties: properties2Object((item as PageObjectResponse).properties),
    };
  });
});

import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { PageObjectResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';



const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const MDProcess = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify)
  .process

export async function notionPage2html(slug: string) {
  const mdblocks = await n2m.pageToMarkdown(slug);
  const mdString = n2m.toMarkdownString(mdblocks);
  const file = await MDProcess(mdString)
  return String(file)
}


export async function getPostList(postDatabaseId: string) {
  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'published',
          },
        },
        {
          property: 'keep',
          checkbox: {
            equals: true,
          },
        }
      ]
    },
    sorts: [],
  });
  return response.results.map((item) => {
    const entry = Object.entries((item as PageObjectResponse).properties).map(([key, value]) => {
      // code below is co-authored with Github Copilot
      switch (value.type) {
        case 'title':
          return [key, value.title[0]?.plain_text]
        case 'rich_text':
          return [key, value.rich_text[0]?.plain_text]
        case 'date':
          return [key, value.date?.start]
        case 'select':
          return [key, value.select?.name]
        case 'multi_select':
          return [key, value.multi_select?.map((item) => item.name)]
        case 'number':
          return [key, value.number]
        case 'people':
          return [key, value.people?.map((item) => (item as UserObjectResponse).name)]
        case 'files':
          return [key, value.files?.map((item) => item.name)]
        case 'checkbox':
          return [key, value.checkbox]
        case 'url':
          return [key, value.url]
        case 'email':
          return [key, value.email]
        case 'phone_number':
          return [key, value.phone_number]
        case 'formula':
          switch (value.formula.type) {
            case 'string':
              return [key, value.formula.string]
            case 'number':
              return [key, value.formula.number]
            case 'boolean':
              return [key, value.formula.boolean]
            case 'date':
              return [key, value.formula.date?.start]
          }
        case 'relation':
          return [key, value.relation?.map((item) => item.id)]
        case 'rollup':
          switch (value.rollup.type) {
            case 'number':
              return [key, value.rollup.number]
            case 'date':
              return [key, value.rollup.date?.start]
            case 'array':
              return [key, value.rollup.array]
          }
        case 'created_time':
          return [key, value.created_time]
        case 'created_by':
          return [key, (value.created_by as UserObjectResponse).name]
        case 'last_edited_time':
          return [key, value.last_edited_time]
        case 'last_edited_by':
          return [key, (value.last_edited_by as UserObjectResponse)?.name]
        default:
          return [key, value]
      }
    })
    return {
      id: item.id,
      properties: Object.fromEntries(entry)
    }
  })
}
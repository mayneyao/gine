import { createEidosClient } from "@eidos.space/client";

const TABLE_ID = "b8081728310b49fea0ff1d14e190b3fb";

const client = createEidosClient({
  endpoint: "http://localhost:3000/rpc",
});

export interface EidosPost {
  _id: string;
  title: string;
  pubDate: Date;
  description: string;
  heroImage?: string;
  content: string;
  slug: string;
  published: boolean;
  tags?: string[];
}

const columnMap = {
  id: "_id",
  public_date: "cl_2n96",
  content: "cl_7mpg",
  keep: "cl_cwyd",
  description: "cl_ivm5",
  published: "cl_lkv6",
  cover: "cl_r0yf",
  tags: "cl_py8c",
  slug: "cl_y4ji",
  title: "title",
} as const;

export async function getPosts(): Promise<EidosPost[]> {
  const posts = await client.currentSpace.table(TABLE_ID).findMany({
    where: {
      [columnMap.published]: true,
      [columnMap.keep]: true,
    },
    orderBy: {
      [columnMap.public_date]: "desc",
    },
  });

  const mappedPosts = await Promise.all(
    posts.map(async (post: any) => {
      const originalId = post._id;
      const sanitizedId = originalId.replace(/-/g, "");
      const slug = post[columnMap.slug] || sanitizedId;
      
      // Fetch markdown content using the doc API
      let content = "";
      try {
        content = await client.currentSpace.doc.getMarkdown(sanitizedId);
      } catch (e) {
        console.error(`Failed to fetch markdown for ${sanitizedId}:`, e);
        // Fallback to table column if getMarkdown fails
        content = post[columnMap.content] || "";
      }

      return {
        _id: sanitizedId,
        title: post[columnMap.title],
        pubDate: new Date(post[columnMap.public_date]),
        description: post[columnMap.description],
        heroImage: post[columnMap.cover],
        content,
        slug,
        published: post[columnMap.published],
        tags: Array.isArray(post[columnMap.tags]) ? post[columnMap.tags] : undefined,
      };
    })
  );

  return mappedPosts;
}

export async function getPostBySlug(slug: string): Promise<EidosPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

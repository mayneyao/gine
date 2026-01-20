import { createEidosClient } from "@eidos.space/client";

// Use environment variables with fallbacks for local development
const EIDOS_SERVER_URL = import.meta.env.EIDOS_SERVER_URL || "https://eidos-headless.gine.workers.dev";
const TABLE_ID = import.meta.env.EIDOS_TABLE_ID || "b8081728310b49fea0ff1d14e190b3fb";

const client = createEidosClient({
  endpoint: `${EIDOS_SERVER_URL}/rpc`,
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

// Get posts metadata only (without content) - use for listing pages
export async function getPostsMeta(): Promise<Omit<EidosPost, 'content'>[]> {
  const posts = await client.currentSpace.table(TABLE_ID).findMany({
    where: {
      [columnMap.published]: true,
      [columnMap.keep]: true,
    },
    orderBy: {
      [columnMap.public_date]: "desc",
    },
  });

  return posts.map((post: any) => {
    const originalId = post._id;
    const sanitizedId = originalId.replace(/-/g, "");
    const slug = post[columnMap.slug] || sanitizedId;

    return {
      _id: sanitizedId,
      title: post[columnMap.title],
      pubDate: new Date(post[columnMap.public_date]),
      description: post[columnMap.description],
      heroImage: post[columnMap.cover],
      slug,
      published: post[columnMap.published],
      tags: Array.isArray(post[columnMap.tags]) ? post[columnMap.tags] : undefined,
    };
  });
}

// Get posts with full content - use for individual post pages
export async function getPosts(): Promise<EidosPost[]> {
  const postsMeta = await getPostsMeta();

  const mappedPosts = await Promise.all(
    postsMeta.map(async (post) => {
      let content = "";
      try {
        content = await client.currentSpace.doc.getMarkdown(post._id);
      } catch (e) {
        console.error(`Failed to fetch markdown for ${post._id}:`, e);
      }

      return {
        ...post,
        content,
      };
    })
  );

  return mappedPosts;
}

export async function getPostBySlug(slug: string): Promise<EidosPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

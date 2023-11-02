import { getPostList } from "@/lib/notion";

const postDatabaseId = process.env.NOTION_POST_DATABASE_ID;

export async function generateStaticParams() {
  const posts = await getPostList(postDatabaseId!);

  return posts.map((post) => ({
    slug: post.id.split('-').join(''),
  }));
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mx-auto">
    {children}
  </div>
}
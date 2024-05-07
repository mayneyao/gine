import { dataSource } from "@/lib/data-source";

export async function generateStaticParams() {
  const posts = await dataSource.getPostList();

  return posts.map((post) => ({
    slug: post.id.split("-").join(""),
  }));
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto">{children}</div>;
}

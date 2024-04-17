import { Nav } from "@/components/nav";
import { dataSource } from "@/lib/data-source";
import Link from "next/link";

// now working for now
// export const preload = () => {
//   // void evaluates the given expression and returns undefined
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
//   void getPostList(postDatabaseId!);
// }

export default async function PostList() {
  const posts = await dataSource.getPostList();
  return (
    <>
      <Nav />
      <div className="mx-auto prose lg:prose-xl max-w-[65ch]">
        {posts.map((post) => (
          <div key={post.id} className="px-4 py-4">
            <span className="text-gray-400 mr-[2rem] font-mono">
              {post.public_date}
            </span>
            <Link
              className="dark:text-gray-200"
              href={`/posts/${post.id.split("-").join("")}`}
            >
              {post.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

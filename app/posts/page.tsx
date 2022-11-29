import { getPostList } from '@/lib/notion';
import Link from 'next/link';

const postDatabaseId = process.env.NOTION_POST_DATABASE_ID;

export default async function PostList() {
  const posts = await getPostList(postDatabaseId!);
  return <div>
    <nav className="mx-auto max-w-3xl">
      <Link href="/" className='inline-block p-3'>👈back</Link>
      <hr />
    </nav>
    <div className='mx-auto prose lg:prose-xl'>
      {
        posts.map(post => (
          <div
            key={post.id}
            className="px-4 py-4"
          >
            <span className="text-gray-400 mr-[2rem]">
              {post.properties.public_date}
            </span>
            <Link href={`/posts/${post.id.split('-').join('')}`}>
              {
                post.properties.name
              }
            </Link>

          </div>
        ))
      }
    </div>
  </div>
}
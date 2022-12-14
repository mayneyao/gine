import { Nav } from '@/components/nav';
import { getPostList } from '@/lib/notion';
import Link from 'next/link';

const postDatabaseId = process.env.NOTION_POST_DATABASE_ID;

export default async function PostList() {
  const posts = await getPostList(postDatabaseId!);
  return <>
    <Nav />
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
            <Link
              className='dark:text-gray-200'
              href={`/posts/${post.id.split('-').join('')}`}
            >
              {
                post.properties.name
              }
            </Link>

          </div>
        ))
      }
    </div>
  </>
}
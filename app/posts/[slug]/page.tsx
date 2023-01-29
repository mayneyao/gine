import { DisqusComments } from "@/components/comment";
import { getPageMeta, notionPage2html } from "@/lib/notion";
import './code.css';

export const revalidate = 60 * 60 * 24; // 24 hours

async function Post({ params }: {
  params: { slug: string },
}) {
  const htmlStr = await notionPage2html(params.slug);
  const meta = await getPageMeta(params.slug);
  return <div className="mx-auto max-w-2xl">
    <div className="mb-4 p-3">
      <h1 className="text-3xl font-bold pb-3">
        {meta.name}
      </h1>
      <div className="flex flex-wrap">
        <span className="text-gray-400 mr-[2rem]">
          {meta.public_date}
        </span>
        {/* tags */}
        {
          meta.tags.map((tag: string) => (
            <span className="text-gray-400 mr-[2rem]" key={tag}>
              #{tag}
            </span>
          ))
        }
      </div>

    </div>
    <article className="prose prose-slate dark:prose-invert mb-8 p-3 lg:prose-lg" dangerouslySetInnerHTML={{
      __html: htmlStr
    }}>
    </article>
    <hr />
    <div className="px-4 py-4">
      <DisqusComments
        post={{
          id: params.slug,
          title: params.slug
        }} />
    </div>
  </div>
}

export default Post;
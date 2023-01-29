import { DisqusComments } from "@/components/comment";
import { getPageMeta, notionPage2html } from "@/lib/notion";
import './code.css';

export const revalidate = 60 * 60 * 24; // 24 hours

async function Post({ params }: {
  params: { slug: string },
}) {
  const htmlStr = await notionPage2html(params.slug);
  const meta = await getPageMeta(params.slug);
  return <>
    <article className="prose prose-slate dark:prose-invert mb-8 p-3 lg:prose-lg">
      <h1>
        {meta.name}
      </h1>
      <div dangerouslySetInnerHTML={{
        __html: htmlStr
      }}></div>
    </article>
    <hr />
    <div className="px-4 py-4">
      <DisqusComments
        post={{
          id: params.slug,
          title: params.slug
        }} />
    </div>
  </>

}

export default Post;
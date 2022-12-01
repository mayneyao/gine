import { DisqusComments } from "@/components/comment";
import { notionPage2html } from "@/lib/notion";

export const revalidate = 60 * 60 * 24; // 24 hours

async function Post({ params }: {
  params: { slug: string },
}) {
  const htmlStr = await notionPage2html(params.slug);
  return <div className="mx-auto max-w-3xl">
    <article
      className="prose prose-slate dark:prose-invert mb-8 p-3 lg:prose-lg"
      dangerouslySetInnerHTML={{
        __html: htmlStr
      }}>
    </article>
    <hr />
    <DisqusComments post={{
      id: params.slug,
      title: params.slug
    }} />
  </div>

}

export default Post;
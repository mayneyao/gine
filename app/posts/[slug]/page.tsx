import { notionPage2html } from "@/lib/notion";

async function Post({ params }: {
  params: { slug: string },
}) {
  const htmlStr = await notionPage2html(params.slug);
  return <article
    className="mx-auto prose prose-slate dark:prose-invert mb-8 p-3 lg:prose-lg max-w-3xl"
    dangerouslySetInnerHTML={{
      __html: htmlStr
    }}>
  </article>
}

export default Post;
import { DisqusComments } from "@/components/comment";
import { getPageMeta, notionPage2html } from "@/lib/notion";
import './code.css';

type IPostProps = {
  params: {
    slug: string;
  }
}
export const revalidate = 86400;

// preload
// export const preload = async (slug: string) => {
//   // void evaluates the given expression and returns undefined
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
//   void getPageMeta(slug);
//   void notionPage2html(slug);
// }

export default async function Post({ params }: IPostProps) {
  const htmlStr = await notionPage2html(params.slug);
  const meta = await getPageMeta(params.slug);
  return <div className="mx-auto prose prose-slate dark:prose-invert mb-8 p-3">
    <div className="mb-4 mx-auto">
      <h1 className="text-3xl font-bold pb-3">
        {meta.name}
      </h1>
      <div className="flex flex-wrap">
        <span className="text-gray-400 mr-[2rem]">
          {meta.public_date}
        </span>
        {
          meta.tags.map((tag: string) => (
            <span className="text-gray-400 mr-[2rem]" key={tag}>
              #{tag}
            </span>
          ))
        }
      </div>
    </div>
    <article dangerouslySetInnerHTML={{
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
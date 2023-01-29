import { getPageMeta } from "@/lib/notion";

export default async function Head({ params }: {
  params: { slug: string },
}) {
  const meta = await getPageMeta(params.slug);

  return (
    <>
      <title>{meta.name}</title>
      <meta property="og:title" content={meta.name} key="title" />
    </>
  )
}
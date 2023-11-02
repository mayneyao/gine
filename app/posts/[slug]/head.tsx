import { getPageMeta } from "@/lib/notion";

export default async function Head({ params }: { params: { slug: string } }) {
  const meta = await getPageMeta(params.slug);

  const title = `${meta.name} | gine.me`;
  const url = `https://gine.me/posts/${params.slug}`;
  const description = meta.desc;
  const image = meta.image || "https://gine.me/default-og-image.jpg";
  return (
    <>
      <title>{title}</title>
      <meta property="description" content={description} />
      {/* og */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* twitter og */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="gine.me" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

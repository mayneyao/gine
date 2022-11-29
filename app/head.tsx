import config from '@/gine.config';

export default function Head() {
  return (
    <>
      <title>{config.site.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={config.site.name} />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

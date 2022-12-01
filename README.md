> yet another blog powered by Notion & Next.js

this blog use [Notion](https://www.notion.so/) as a CMS, and [Next.js](https://nextjs.org/) as a static site generator. benefit of this approach is that you can write blog post in Notion, and it will be automatically deployed to [Vercel](https://vercel.com/) as a static site.

Next.js support ISR (Incremental Static Regeneration) which means that you can update your blog post in Notion, and it will be automatically updated in your static site. just deploy once, then forget about it forever.

## Basic Data Flow

1. get data from Notion's Database via [Notion SDK](https://github.com/makenotion/notion-sdk-js)
2. transform Notion Blocks to Markdown via [notion-to-md](https://github.com/souvikinator/notion-to-md)
3. render Markdown to HTML via [remark](https://github.com/remarkjs/remark)
4. use tailwindcss `prose` to style HTML

it's very simple, and you can easily customize it to your needs.

## How to use

## TODO

- [x] add comment
- [x] code highlight
- [x] fix bookmark rendering(render as link)
- [x] dark mode
- [ ] custom post slug
- [ ] sitemap
- [ ] rss feed
- [ ] generate post interface from notion database for better type safety

## FAQ

- why not use react-notion-x as a renderer?
  - i want to try Next.js 13's new feature, react-notion-x is not compatible well with it.
  - markdown is fine for me

## Thanks

- [notion-to-md](https://github.com/souvikinator/notion-to-md)

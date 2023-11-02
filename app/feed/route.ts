import { getPostList } from "@/lib/notion";
import { Feed } from "feed";

const postDatabaseId = process.env.NOTION_POST_DATABASE_ID;
const feed = new Feed({
  title: "Mayne's Blog",
  description: "Mayne's Blog RSS Feed",
  id: "http://gine.me",
  link: "http://gine.me",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "http://gine.me/avatar.jpg",
  favicon: "http://gine.me/favicon.ico",
  copyright: "All rights reserved 2023, Mayne",
  //   updated: new Date(2013, 6, 14), // optional, default = today
  //   generator: "awesome", // optional, default = 'Feed for Node.js'
  //   feedLinks: {
  //     json: "https://example.com/json",
  //     atom: "https://example.com/atom",
  //   },
  author: {
    name: "Mayne",
    email: "i@gine.me",
    link: "https://gine.me/about",
  },
});

export async function GET() {
  const posts = await getPostList(postDatabaseId!);

  posts.forEach((post) => {
    const id = post.id.split("-").join("");
    feed.addItem({
      title: post.properties.name,
      id: id,
      link: `https://gine.me/posts/${id}`,
      description: post.properties.desc,
      content: "",
      date: new Date(post.properties.public_date),
    });
  });
  return new Response(feed.rss2(), {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}

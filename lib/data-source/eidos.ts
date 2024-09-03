import { IPost } from "../interface";
import { md } from "../markdown";
import { BaseDataSource } from "./base";

export class EidosDataSource implements BaseDataSource {
  constructor(private space: string, private tableId: string) {
    this.space = space;
    this.tableId = tableId;
  }

  async getHtml(slug: string): Promise<string> {
    const response = await fetch(`https://eidos.ink/${this.space}/md-${slug}`);
    const markdown = await response.text();
    return md.render(markdown);
  }

  async getMeta(slug: string): Promise<IPost | undefined> {
    const data = await this.getPostList();
    return data.find((item: any) => item.id.split("-").join("") === slug);
  }

  async getPostList(): Promise<IPost[]> {
    // implementation
    const response = await fetch(
      `https://eidos.ink/${this.space}/json-${this.tableId}`
    );
    const data = await response.json();
    return data
      .filter((item: any) => {
        return item.status === "published" && Boolean(item.keep);
      })
      .map((item: any) => {
        return {
          id: item._id,
          ...item,
          public_date: item.public_date.split("T")[0],
        };
      })
      .sort((a: any, b: any) => {
        return (
          new Date(b.public_date).getTime() - new Date(a.public_date).getTime()
        );
      });
  }
}

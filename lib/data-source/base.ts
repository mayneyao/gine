export abstract class BaseDataSource {
  abstract getHtml: (slug: string) => Promise<string>;
  abstract getMeta: (slug: string) => Promise<any>;
  abstract getPostList: () => Promise<any[]>;
}

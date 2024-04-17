export interface IPost {
  id: string;
  name: string;
  title?: string;
  desc?: string;
  cover?: string;
  tags: string[];
  public_date: string;
}

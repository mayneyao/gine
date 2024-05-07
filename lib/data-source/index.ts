import { EidosDataSource } from "./eidos";
import { NotionDataSource } from "./notion";

// export const dataSource = new NotionDataSource(
//   process.env.NOTION_POST_DATABASE_ID || ""
// );
export const dataSource = new EidosDataSource(
  "eidos",
  "b8081728310b49fea0ff1d14e190b3fb"
);

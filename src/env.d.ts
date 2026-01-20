/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EIDOS_SERVER_URL: string;
  readonly EIDOS_TABLE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

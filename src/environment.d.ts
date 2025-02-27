/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENVIRONMENT: "development" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_DEV_TOOLS: "true" | "false";
  readonly VITE_USERS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

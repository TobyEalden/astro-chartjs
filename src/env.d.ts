// Astro_CDN/src/env.d.ts

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_BASE_URL: string;
    // Add other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  

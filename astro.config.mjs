import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://henzard.co.za',
  output: 'static',
  build: { format: 'directory' },
});

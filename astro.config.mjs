import { defineConfig } from 'astro/config';
import { site } from './src/config.ts';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
});

import { renderToString } from '@vue/server-renderer';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import { createApp } from './app';
import type { PageContextServer } from './types';

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps'];

async function render(pageContext: PageContextServer) {
  const app = createApp(pageContext);

  const appHtml = await renderToString(app);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>D&D Helpers</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}

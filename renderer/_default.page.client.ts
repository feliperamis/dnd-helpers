import { createApp } from './app';
import type { PageContextClient } from './types';
import '@/assets/main.scss';

export { render };

export const clientRouting = true;
export const prefetchStaticAssets = { when: 'VIEWPORT' };

async function render(pageContext: PageContextClient) {
  const app = createApp(pageContext);
  app.mount('#app', true);
}

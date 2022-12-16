import { createSSRApp, defineComponent, h } from 'vue';
import PageShell from './PageShell.vue';
import Link from './Link.vue';
import { setPageContext } from './usePageContext';
import type { PageContext } from './types';
import { createPinia } from 'pinia';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHeart,
  faListCheck,
  faBed,
  faPenToSquare,
  faCircle,
  faClipboard,
  faArrowUpRightFromSquare,
  faEllipsis,
  faCirclePlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export { createApp };

const pinia = createPinia();
library.add(
  faHeart,
  faListCheck,
  faBed,
  faPenToSquare,
  faCircle,
  faClipboard,
  faArrowUpRightFromSquare,
  faEllipsis,
  faCirclePlus,
  faTrash
);
function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = defineComponent({
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        }
      );
    },
  });

  const app = createSSRApp(PageWithLayout);

  // Register a global custom directive called `v-focus`
  app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus();
    },
  });

  app.component('RLink', Link);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
  app.use(pinia);

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return app;
}

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import piniaPersist from 'pinia-plugin-persist';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHeart,
  faListCheck,
  faBed,
  faPenToSquare,
  faCircle,
  faClipboard,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

import './assets/main.scss';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
library.add(
  faHeart,
  faListCheck,
  faBed,
  faPenToSquare,
  faCircle,
  faClipboard,
  faArrowUpRightFromSquare
);

// Register a global custom directive called `v-focus`
app.directive('focus', {
  // When the bound element is mounted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus();
  },
});

app.use(pinia);
app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');

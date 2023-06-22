import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/modules/app/store';
import autoLoadRoute from '@/modules/app/router';
import vuetify from '@/plugins/vuetify';
import BaseComponentRegister from '@/modules/app/ui/components';
import '@/modules/app/assets/styles/custom.scss';

// icon
import FontAwesomeComponent from '@/plugins/font-awesome';

const AppInit = async (callback = null) => {
  const app = createApp(App);

  // Autoload Route
  const router = await autoLoadRoute();

  // Libraries
  app.use(pinia);
  app.use(router);
  app.use(vuetify);

  // Base Components
  BaseComponentRegister(app);
  FontAwesomeComponent(app);

  // Custom callback
  callback && callback(app);

  // Mount
  app.mount('#app');
};

(async function () {
  await AppInit();
})();

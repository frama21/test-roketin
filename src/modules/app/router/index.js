import { createRouter, createWebHistory } from 'vue-router';
import { AppCommonNotAuthorized, AppCommonNotFound } from '@/modules/app/ui/components/common';

/**
 * Autoload route
 * Will read file with prefix .route.js
 */
const autoLoadRoute = async () => {
  const routes = [];
  const modules = import.meta.glob('/**/*.route.js');
  for (const path in modules) {
    const module = await modules[path]();
    routes.push(...module.default);
  }

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Auto register routes
      ...routes,

      // 403
      {
        path: '/not-authorized',
        name: 'not-authorized',
        component: AppCommonNotAuthorized,
      },

      // 404
      {
        path: '/:catchAll(.*)',
        component: AppCommonNotFound,
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    next();
  });

  return router;
};
export default autoLoadRoute;

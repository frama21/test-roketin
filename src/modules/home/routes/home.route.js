// constant
import { LAYOUT } from '@/modules/app/constants/layout.constant';

const routes = [
  {
    path: '',
    meta: {
      layout: LAYOUT.DEFAULT,
    },
    component: () => import('../ui/homeUI.vue'),
  },
];

export default routes;

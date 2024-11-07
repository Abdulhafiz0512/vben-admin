import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:map',
      order: 10_000,
      title: $t('Maps'),
    },
    name: 'Maps',
    path: '/maps',
  },
];

export default routes;

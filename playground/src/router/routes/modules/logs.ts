import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:file-clock',
      order: 1002,
      title: $t('Logs'),
    },
    name: 'Logs',
    path: '/logs',
    children: [
      {
        name: 'Logs List',
        path: '/loglist',
        component: () => import('#/views/user-logs/index.vue'),
        meta: {
          icon: 'lucide:logs',
          title: $t('Logs List'),
        },
      },
    ],
  },
];

export default routes;

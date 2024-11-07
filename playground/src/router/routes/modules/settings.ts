import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings',
      order: 10_001,
      title: $t('Settings'),
    },
    name: 'Settings',
    path: '/settings',
    children: [
      {
        name: 'Settings List',
        path: '/settinglist',
        component: () => import('#/views/settings/index.vue'),
        meta: {
          title: $t('Settings List'),
        },
      },
    ],
  },
];

export default routes;

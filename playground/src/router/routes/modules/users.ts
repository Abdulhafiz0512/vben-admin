import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:users',
      order: 1001,
      title: $t('Users'),
    },
    name: 'Users',
    path: '/users',
    children: [
      {
        name: 'Users List',
        path: '/userlist',
        component: () => import('#/views/users/userlist/index.vue'),
        meta: {
          icon: 'lucide:file-user',
          title: $t('Users List'),
        },
      },
    ],
  },
];

export default routes;

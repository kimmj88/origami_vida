import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/indexPage.vue') },
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'signup', component: () => import('pages/signupPage.vue') },
      { path: 'page1', component: () => import('pages/page1.vue') },
      { path: 'page2', component: () => import('pages/page2.vue') },
      { path: 'page3', component: () => import('pages/page3.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

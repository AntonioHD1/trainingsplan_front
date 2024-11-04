const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/member', component: () => import('pages/MemberPage.vue') },
      { path: '/coach', component: () => import('pages/CoachPage.vue') },
      { path: '/team', component: () => import('pages/TeamPage.vue') },
      { path: '/plan', component: () => import('pages/PlanPage.vue') },
      { path: '/training', component: () => import('pages/TrainingPage.vue') },
      { path: '/court', component: () => import('pages/CourtPage.vue') },
      { path: '/new_member', component: () => import('pages/NewMemberPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

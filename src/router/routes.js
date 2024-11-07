const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("src/pages/General/IndexPage.vue") },
      { path: "/members", name: "members", component: () => import("pages/MemberPage.vue") },
      { path: "/coach", component: () => import("pages/CoachPage.vue") },
      { path: "/team", component: () => import("pages/TeamPage.vue") },
      { path: "/plan", component: () => import("pages/PlanPage.vue") },
      { path: "/training", component: () => import("pages/TrainingPage.vue") },
      { path: "/court", component: () => import("pages/CourtPage.vue") },
      { path: "/member/new", component: () => import("src/pages/New/NewMemberPage.vue"), },
      { path: "/coach/new", component: () => import("src/pages/New/NewCoachPage.vue"), },
      { path: "/team/new", component: () => import("src/pages/New/NewTeamPage.vue"), },
      { path: "/plan/new", component: () => import("src/pages/New/NewPlanPage.vue"), },
      { path: "/training/new", component: () => import("src/pages/New/NewTrainingPage.vue"), },
      { path: "/court/new", component: () => import("src/pages/New/NewCourtPage.vue"), },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/General/ErrorNotFound.vue"),
  },
];

export default routes;

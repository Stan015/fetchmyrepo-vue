import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/page/:pageNumber",
      name: "page",
      component: HomeView,
    },
    {
      path: "/repos/:userLogin/:repoName/:currentPage",
      name: "repository",
      component: () => import("@/views/RepositoryDetailsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;

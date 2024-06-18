import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: 'Home',
        description: "This page contains a list of public repositories and github profile card of Stanley Azi."
      }
    },
    {
      path: "/page/:pageNumber",
      name: "page",
      component: HomeView,
      meta: {
        title: 'Home',
        description: "This page contains a list of public repositories and github profile card of Stanley Azi."
      }
    },
    {
      path: "/repos/:userLogin/:repoName/:currentPage",
      name: "repository",
      component: () => import("@/views/RepositoryDetailsView.vue"),
      meta: {
        title: 'Repository Details',
        description: "This page contains the details of the active/clicked repository."
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        title: 'Not Found',
        description: "This is a 404 page."
      }
    },
  ],
});

export default router;

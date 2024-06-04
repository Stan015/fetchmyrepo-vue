<script setup>
import { onMounted, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCurrentPageStore } from "@/stores/pageStore.js";
import { useRepoStore } from "@/stores/repoStore.js";
import { RouterLink, useRoute } from "vue-router";
import ErrorBoundaryUI from "@/components/ErrorBoundaryUI.vue";
import {
  Pagination,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import RepoListSkeleton from "@/components/ui/skeleton/RepoListSkeleton.vue";

const pageStore = useCurrentPageStore();
const { page, totalPages } = storeToRefs(pageStore);

const repoStore = useRepoStore();
const {
  isLoading,
  filteredRepos,
  reposPerPage,
  searchQuery,
  filterQuery,
  catchedError,
} = storeToRefs(repoStore);
const { fetchRepositories, updatePageFromRoute } = repoStore;

onMounted(() => {
  fetchRepositories();
  updatePageFromRoute();
});

const displayedReposPerPage = computed(() => {
  const startIndex = (page.value - 1) * reposPerPage.value;
  const endIndex = page.value * reposPerPage.value;

  return filteredRepos.value.slice(startIndex, endIndex);
});

const route = useRoute();

watch(route, updatePageFromRoute);

// watch(displayedReposPerPage, (newVal) => {
//   console.log("Displayed Repositories:", newVal);
// });

// watch(repositories, (newVal) => {
//   console.log("Repositories:", newVal);
// });

// watch(page, (newVal) => {
//   console.log("Page:", newVal);
// });

const prevBtnStyle = computed(() => {
  return {
    "pointer-events-none opacity-30": page.value === 1,
    "cursor-pointer hover:bg-violet-800": page.value > 1,
    "bg-primary w-24 p-2 pr-4 transition-all": true,
  };
});

const nextBtnStyle = computed(() => {
  return {
    "pointer-events-none opacity-30": page.value === totalPages.value,
    "cursor-pointer hover:bg-violet-800": page.value !== totalPages.value,
    "bg-primary w-24 p-2 pl-4 transition-all": true,
  };
});
</script>

<template>
  <ErrorBoundaryUI v-if="catchedError" />
  <main
    v-else
    class="flex flex-col w-full place-items-center mb-10 justify-between min-h-full gap-6 pt-10"
  >
    <div
      class="flex gap-2 w-full items-center h-max max-md:w-4/5 max-lg:w-3/5 lg:w-3/6"
    >
      <Input
        type="search"
        placeholder="Search repo by name..."
        v-model="searchQuery"
      />
      <select
        v-model="filterQuery"
        class="w-[5rem] h-[2.35rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-center text-gray-200"
        tabIndex="0"
      >
        <option value="">Filter</option>
        <option value="Javascript">Javascript</option>
        <option value="Typescript">Typescript</option>
        <option value="Vue">Vue</option>
        <option value="CSS">CSS</option>
        <option value="HTML">HTML</option>
      </select>
    </div>
    <Card
      class="flex flex-col items-center justify-between min-h-[35rem] max-md:w-4/5 max-lg:w-[90%] lg:w-[90%] md:border-none gap-2"
    >
      <CardHeader class="mb-4">
        <CardTitle class="text-3xl text-center mb-2 max-sm:text-2xl uppercase">
          My Repositories
        </CardTitle>
        <CardDescription class="text-center text-base">
          This is a list of my github repositories, click on any to view project
          details.
        </CardDescription>
      </CardHeader>
      <RepoListSkeleton v-if="isLoading" />
      <h2 v-if="!isLoading && displayedReposPerPage.length === 0" class="text-[2rem]">
        No Repository matched search query.
      </h2>
      <CardContent v-else class="flex justify-center h-full w-full">
        <ul
          class="flex w-full justify-center text-center gap-4 h-full flex-wrap"
        >
          <li
            v-for="repo in displayedReposPerPage"
            :key="repo.id"
            class="w-[20rem] p-1 text-lg"
          >
            <!-- <p class="text-sm w-3/4 max-sm:w-full text-gray-400 pb-2 text-balance pointer-events-none"></p> -->
            <RouterLink
              class="flex flex-col items-center justify-center gap-1 h-full border-border border-2 rounded-sm transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
              :to="`/repos/${repo.owner.login}/${repo.name}/page=${page}`"
            >
              {{ repo.name }}
              <p
                class="text-sm text-gray-400 pb-2 px-1 text-balance pointer-events-none"
                v-if="repo.description"
              >
                {{ repo.description }}
              </p>
              <p
                class="text-sm text-gray-400 pb-2 text-balance pointer-events-none"
              >
                {{ repo.language }}
              </p>
            </RouterLink>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Pagination
          :total="totalPages"
          :sibling-count="1"
          show-edges
          :default-page="1"
        >
          <div class="flex items-center gap-2">
            <PaginationPrev
              :class="prevBtnStyle"
              @click="pageStore.handlePrevPage"
            />
            <div>
              <Button class="bg-secondary">
                {{ page }}
              </Button>
            </div>
            <PaginationNext
              :class="nextBtnStyle"
              @click="pageStore.handleNextPage"
            />
          </div>
        </Pagination>
      </CardFooter>
    </Card>
  </main>
</template>

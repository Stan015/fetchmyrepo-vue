<script setup>
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCurrentPageStore } from "@/stores/pageStore.js";
import { useRepoStore } from "@/stores/repoStore.js";
import { RouterLink } from "vue-router";
import {
  Pagination,
  PaginationList,
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
const { isLoading, filteredRepos, reposPerPage, searchQuery, filterQuery } = storeToRefs(repoStore);
const {fetchRepositories} = repoStore;

onMounted(() => {
  fetchRepositories();
});

const displayedReposPerPage = computed(() => {
  const startIndex = (page.value - 1) * reposPerPage.value;
  const endIndex = page.value * reposPerPage.value;

  return filteredRepos.value.slice(startIndex, endIndex);
});

// watch(displayedReposPerPage, (newVal) => {
//   console.log("Displayed Repositories:", newVal);
// });

// watch(repositories, (newVal) => {
//   console.log("Repositories:", newVal);
// });

// watch(page, (newVal) => {
//   console.log("Page:", newVal);
// });
</script>

<template>
  <main
    className="flex flex-col w-full place-items-center justify-between min-h-full gap-6 pt-10"
  >
    <div
      className="flex gap-2 w-full items-center h-max max-md:w-4/5 max-lg:w-3/5 lg:w-3/6"
    >
      <Input
        type="search"
        placeholder="Search repo by name..."
        v-model="searchQuery"
      />
      <select
        v-model="filterQuery"
        className="w-[5rem] h-[2.35rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-center text-gray-200"
        tabIndex="0"
      >
        <option value="">Filter</option>
        <option value="Javascript">Javascript</option>
        <option value="Typescript">Typescript</option>
        <option value="Vue">Vue</option>
        <option value="CSS">CSS</option>
        <option value="HTML">HTML</option>
      </select>
      <!-- <Link className="w-[8.3rem] leading-[2.3rem] whitespace-nowrap text-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-gray-200" to={'/repositories/new'}>&#x2b; New Repo</Link>  -->
    </div>
    <Card
      className="flex flex-col items-center justify-between min-h-full max-md:w-4/5 max-lg:w-[90%] lg:w-[90%] md:border-none"
    >
      <CardHeader className="mb-4">
        <CardTitle
          className="text-3xl text-center mb-2 max-sm:text-2xl uppercase"
        >
          My Repositories
        </CardTitle>
        <CardDescription className="text-center text-base">
          This is a list of my github repositories, click on any to view project
          details.
        </CardDescription>
      </CardHeader>
      <RepoListSkeleton v-if="isLoading" />
      <CardContent v-else className="flex justify-center h-full w-full">
        <ul
          className="flex w-full justify-center text-center gap-4 h-full flex-wrap"
        >
          <li
            v-for="repo in displayedReposPerPage"
            :key="repo.id"
            className=" w-[20rem] p-1 text-lg"
          >
            <!-- <p className="text-sm w-3/4 max-sm:w-full text-gray-400 pb-2 text-balance pointer-events-none"></p> -->
            <RouterLink
              className="flex flex-col items-center justify-center gap-1 h-full border-border border-2 rounded-sm transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
              :to="`repos/${repo.owner.login}/${repo.name}/page=${page}`"
            >
              {{ repo.name }}
              <p
                className="text-sm  text-gray-400 pb-2 px-1 text-balance pointer-events-none"
                v-if="repo.description"
              >
                {{ repo.description }}
              </p>
              <p
                className="text-sm  text-gray-400 pb-2 text-balance pointer-events-none"
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
          <PaginationList class="flex items-center gap-2">
            <PaginationPrev
              class="w-24 p-2 pr-4"
              @click="pageStore.handlePrevPage"
            />
            <PaginationListItem>
              <Button>
                {{ page }}
              </Button>
            </PaginationListItem>
            <PaginationNext
              class="w-24 p-2 pl-4"
              @click="pageStore.handleNextPage"
            />
          </PaginationList>
        </Pagination>
      </CardFooter>
    </Card>
  </main>
</template>

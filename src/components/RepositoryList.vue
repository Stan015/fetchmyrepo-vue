<script setup>
import { onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCurrentPageStore } from "../stores/pageStore.js";
import { useRepoStore } from "../stores/repoStore.js";
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
// import RepositoryListSkeleton from "./skeletons/RepositoryListSkeleton";

const pageStore = useCurrentPageStore();
const { page, totalPages } = storeToRefs(pageStore);

const repoStore = useRepoStore()
const { repositories, reposPerPage } = storeToRefs(repoStore)

async function fetchRepositories() {
  try {
    const response = await fetch(`https://api.github.com/users/stan015/repos`, {
      headers: {
        Authorization: import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
          ? `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
          : undefined,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();
    repositories.value = data;

    totalPages.value = Math.ceil(data.length / reposPerPage.value);

  } catch (error) {
    console.log(error.message);
  }
}

onMounted(() => {
  fetchRepositories();
});

const displayedReposPerPage = computed(() => {
  const startIndex = (page.value - 1) * reposPerPage.value;
  const endIndex = page.value * reposPerPage.value;

  return repositories.value.slice(startIndex, endIndex);
});

watch(displayedReposPerPage, (newVal) => {
  console.log('Displayed Repositories:', newVal);
});

watch(repositories, (newVal) => {
  console.log('Repositories:', newVal);
});

watch(page, (newVal) => {
  console.log('Page:', newVal);
});
</script>

<template>
  <div
    className="grid grid-cols-1 w-full justify-items-center min-h-full gap-6 pt-10"
  >
    <div
      className="flex gap-2 w-full items-center h-max max-md:w-4/5 max-lg:w-3/5 lg:w-3/6"
    >
      <Input
        type="search"
        placeholder="Search repo by name..."
        value="{searchQuery}"
        onChange="{handleSearchChange}"
      />
      <select
        className="w-[5rem] h-[2.35rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-cent text-gray-200"
        value="{languageFilter}"
        onChange="{handleLanguageFilter}"
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
      className="flex flex-col items-center max-md:w-4/5 max-lg:w-[90%] lg:w-[90%] md:border-none"
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
      <CardContent className="flex justify-center h-full w-full">
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
              :to="`/${repo.owner.login}/repositories/${repo.name}/page=${page}`"
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
            <PaginationPrev class="w-24 p-2 pr-4" @click="pageStore.handlePrevPage" />
            <PaginationListItem>
              <Button>
                {{ page }}
              </Button>
            </PaginationListItem>
            <PaginationNext class="w-24 p-2 pl-4" @click="pageStore.handleNextPage" />
          </PaginationList>
        </Pagination>
      </CardFooter>
    </Card>
    <footer
      className="flex flex-col w-full h-[11rem] items-center self-end justify-center gap-6 mt-4 border-t-[1px] border-t-slate-800 p-2"
    >
      <!-- <div className="flex w-full gap-6 text-[0.7rem] justify-center"> -->
      <!-- <Link
          className="bg-primary p-2 text-center hover:bg-violet-800 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
          onClick="{testErrorBoundary}"
        >
          Test Error Boundary
        </Link> -->
      <!-- <Link
            className="bg-primary p-2 text-center hover:bg-violet-800transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
            to={"/notfound"}
          >
            Test 404 page
          </Link> -->
      <!-- </div> -->
      <div className="flex w-full justify-around">
        <p className="text-center max-sm:w-1/2 max-sm:text-sm">
          "Everyone's got a blank page and a pen 🖊️"
        </p>
        <span className="text-center max-sm:w-1/2 max-sm:text-sm">
          &copy;{{ ` Stanley Azi ${new Date().getFullYear()}` }}
        </span>
      </div>
    </footer>
  </div>
</template>

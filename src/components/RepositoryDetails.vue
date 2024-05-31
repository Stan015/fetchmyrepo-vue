<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRoute } from "vue-router";
import { useRepoStore } from "@/stores/repoStore.js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import RepoDetailsSekeleton from "@/components/ui/skeleton/RepoDetailsSekeleton.vue";

const repoStore = useRepoStore();
const { repoDetails, isLoading } = storeToRefs(repoStore);


const route = useRoute();
const repoName = ref(route.params.repoName);

// console.log()

const fetchRepoDetails = async () => {
  isLoading.value = true;

  try {
    const response = await fetch(
      `https://api.github.com/repos/Stan015/${repoName.value}`,
      {
        headers: {
          Authorization: import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
            ? `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
            : undefined,
        },
      }
    );

    const data = await response.json();

    repoDetails.value = data;
  } catch (error) {
    console.log(error.message);
  }
  isLoading.value = false;
};

watch(
  () => route.params,
  (newParams) => {
    repoName.value = newParams.repoName;
  }
);

watch(
  () => route.params,
  async () => {
    isLoading.value = true;
    await fetchRepoDetails();
  },
  { immediate: true }
);

onMounted(fetchRepoDetails());
</script>

<template>
  <!-- <RepoDetailsSekeleton v-if="isLoading" /> -->
  <section v-if="repoDetails" className="flex w-full pt-20 justify-center">
    <Card
      className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 mb-10"
    >
      <CardHeader>
        <CardTitle
          className="text-3xl max-sm:text-xl text-center mb-2 uppercase"
          >Project Name: {{ repoDetails.name }}</CardTitle
        >
        <CardDescription className="text-center text-base text-balance">{{
          repoDetails.description
        }}</CardDescription>
      </CardHeader>
      <CardContent
        className="grid w-full grid-cols-2 max-sm:grid-cols-1 items-center text-center gap-4"
      >
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Github Username: {{ repoDetails.owner.login }}
        </p>
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Language: {{ repoDetails.language }}
        </p>
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Stars: {{ repoDetails.stargazers_count }}
        </p>
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Forks: {{ repoDetails.forks_count }}
        </p>
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Open Issues: {{ repoDetails.open_issues_count }}
        </p>
        <p
          v-if="repoDetails.license"
          className="leading-10 border-border border-2 rounded-sm"
        >
          License: {{ repoDetails.license.name }}
        </p>
        <RouterLink
          v-if="repoDetails.homepage"
          className="leading-10 border-border border-2 rounded-sm p-1 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 hover:border-violet-700"
          href="{{repoDetails.homepage}}"
          target="_blank"
          rel="noopener noreferrer"
          >Visit Live Site</RouterLink
        >
        <RouterLink
          v-if="repoDetails.html_url"
          className="leading-10 border-border border-2 rounded-sm p-1 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
          href="{{repoDetails.html_url}}"
          target="_blank"
          rel="noopener noreferrer"
          >Visit Remote Repo</RouterLink
        >
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Date Created:
          {{ new Date(repoDetails.created_at).toLocaleDateString() }}
        </p>
        <p className="leading-10 border-border border-2 rounded-sm p-1">
          Last Updated:
          {{ new Date(repoDetails.updated_at).toLocaleDateString() }}
        </p>
      </CardContent>

      <CardFooter className="">
        <Button
          className="bg-primary hover:bg-violet-800 p-2 rounded-md hover:bg-violet-800transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
          @click="handleBackToPreviousPage"
        >
          Back to repoDetails List
        </Button>
      </CardFooter>
    </Card>
  </section>
    <!-- <RepoDetailsSekeleton v-else /> -->
</template>

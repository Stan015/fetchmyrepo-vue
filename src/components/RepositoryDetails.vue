<script setup>
import { onMounted, watch } from "vue";
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
import RepoDetailsSekeleton from "@/components/ui/skeleton/RepoDetailsSekeleton.vue";

const repoStore = useRepoStore();
const { repoDetails, isLoading, repoName } = storeToRefs(repoStore);
const { fetchRepoDetails } = repoStore;

const route = useRoute();
repoName.value = route.params.repoName;

watch(
  () => route.params,
  (newParams) => {
    repoName.value = newParams.repoName;
    fetchRepoDetails();
  }
);

onMounted(fetchRepoDetails());
</script>

<template>
  <RepoDetailsSekeleton v-if="isLoading && !repoDetails" />
  <section
    v-else-if="!isLoading && repoDetails"
    className="flex w-full pt-20 justify-center"
  >
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
  <div>Is Loading: {{ isLoading }}</div>
  <div>Repo Details: {{ repoDetails.name }}</div>
</template>

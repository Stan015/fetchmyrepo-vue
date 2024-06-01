import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useCurrentPageStore } from "@/stores/pageStore.js";

export const useRepoStore = defineStore("repoStore", () => {
  const repositories = ref([]);
  const reposPerPage = ref(8);
  const repoDetails = ref(null);
  const isLoading = ref(false);
  const repoName = ref(null);
  const searchQuery = ref("");
  const filterQuery = ref("");

  const filteredRepos = computed(() => {
    return repositories.value.filter((repo) => {
      const languageMatch =
        repo.language &&
        repo.language.toLowerCase().includes(filterQuery.value.toLowerCase());

      const nameMatch =
        repo.name &&
        repo.name.toLowerCase().includes(searchQuery.value.toLowerCase());

      return (
        (filterQuery.value ? languageMatch : true) &&
        (searchQuery.value ? nameMatch : true)
      );
    });
  });

  const pageStore = useCurrentPageStore();
  const { totalPages } = storeToRefs(pageStore);

  async function fetchRepositories() {
    isLoading.value = true;

    try {
      const response = await fetch(
        `https://api.github.com/users/stan015/repos`,
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
              ? `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
              : undefined,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const data = await response.json();
      repositories.value = data;

      totalPages.value = Math.ceil(data.length / reposPerPage.value);
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
  }

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

      if (!response) {
        throw new Error("Failed to fetch repository details");
      }

      const data = await response.json();

      repoDetails.value = data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    filteredRepos,
    reposPerPage,
    repoDetails,
    isLoading,
    repoName,
    searchQuery,
    filterQuery,
    fetchRepositories,
    fetchRepoDetails,
  };
});

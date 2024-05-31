import { defineStore } from "pinia";
import { ref } from "vue";

export const useRepoStore = defineStore("repoStore", () => {
  const repositories = ref([]);
  const reposPerPage = ref(8);
  const repoDetails = ref([]);
  const isLoading = ref(true);

  return { repositories, reposPerPage, repoDetails, isLoading };
});

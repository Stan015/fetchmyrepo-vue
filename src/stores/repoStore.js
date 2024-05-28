import { defineStore } from "pinia";
import { ref } from "vue";

export const useRepoStore = defineStore("repoStore", () => {
  const repositories = ref([]);
  const reposPerPage = ref(8);
  
  return { repositories, reposPerPage };
});

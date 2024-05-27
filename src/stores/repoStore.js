import { defineStore } from "pinia";

export const useRepoStore = defineStore('repoStore', () => {
    const repositories = ref([]);
    const reposPerPage = ref(8);

    
})
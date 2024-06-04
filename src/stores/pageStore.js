import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentPageStore = defineStore("currentPage", () => {
  const page = ref(1);
  const totalPages = ref();

  const setTotalPages = (totalPages) => {
    totalPages.value = totalPages;
  };

  const handlePrevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const handleNextPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  };

  return { page, totalPages, setTotalPages, handlePrevPage, handleNextPage };
});

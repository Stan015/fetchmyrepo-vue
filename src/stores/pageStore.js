import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentPageStore = defineStore('currentPage', () => {
  const page = ref(4)
  const totalPages = ref(4);

  const handlePrevPage = () => {
    if (page.value > 1) {
      page.value--
    }
  }
  
  const handleNextPage = () => {
    if (page.value < totalPages.value) {
      page.value++
    }
  }

  return { page, totalPages, handlePrevPage, handleNextPage }
})

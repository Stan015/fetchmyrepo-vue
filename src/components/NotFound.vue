<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleBackToPreviousPage = () => {
  router.back();
};
</script>

<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <img
      class="p-4 w-2/5 max-md:w-5/6 max-sm:w-full"
      src="/404-page.svg"
      alt="404-Page not found"
    />
    <h1 class="text-2xl leading-10 font-bold mb-4">PAGE NOT FOUND</h1>
    <button
      class="bg-primary hover:bg-violet-800 p-2 rounded-md transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
      @click="handleBackToPreviousPage"
    >
      Go Back
    </button>
  </div>
</template>

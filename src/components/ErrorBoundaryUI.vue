<script setup>
const handleRefresh = () => {
  window.location.reload();
};
</script>

<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <img
      class="p-4 w-2/5 max-md:w-5/6 max-sm:w-full"
      src="/error.svg"
      alt="something went wrong"
    />
    <h1
      class="text-2xl leading-10 font-bold mb-4 uppercase max-sm:text-[1.2rem] w-full text-center"
    >
      Something went wrong.
    </h1>
    <button
      class="bg-primary hover:bg-violet-800 p-2 rounded-md transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
      @click="handleRefresh"
    >
      Refresh Page
    </button>
  </div>
</template>

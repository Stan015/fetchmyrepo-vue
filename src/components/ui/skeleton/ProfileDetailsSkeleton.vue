<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div class="flex flex-col w-full items-center gap-6 pt-10">
    <div
      class="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-6 h-full"
    >
      <div class="flex flex-row gap-4 justify-center ">
        <div class="flex flex-col justify-center w-full items-center">
          <div class="flex gap-4 items-center justify-center mb-2">
            <div :class="cn('animate-pulse bg-muted border-border border-2 p-1 h-12 w-12 rounded-full', props.class)" />
            <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 w-32 h-10', props.class)" />
          </div>
          <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-4 w-[250px] max-sm:w-[100px] mb-4', props.class)" />
          <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-4 w-[200px] max-sm:w-[100px]', props.class)" />
        </div>
      </div>
      <div class="flex gap-4 justify-center w-full">
        <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-4 w-[200px] max-sm:w-[100px]', props.class)" />
        <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-4 w-[200px] max-sm:w-[100px]', props.class)" />
      </div>
      <div
        class="flex w-full gap-4 items-center justify-center text-center"
      >
        <div :class="cn('animate-pulse bg-muted border-border border-2 p-1 h-8 w-10 rounded-sm', props.class)" class="" />
        <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-8 w-10', props.class)" class=" rounded-sm" />
        <div :class="cn('animate-pulse bg-muted border-border border-2 rounded-sm p-1 h-8 w-10', props.class)" class=" rounded-sm" />
      </div>
    </div>
  </div>
</template>

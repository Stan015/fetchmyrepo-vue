<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
    <div className="flex flex-col w-full items-center h-full gap-6 pt-10">
      <!-- <div className="flex gap-2 w-full items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 ">
        <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1 w-full', props.class)" />
      </div> -->
      <div className="flex flex-col items-center max-md:w-4/5 max-lg:w-[90%] lg:w-[90%] gap-5 h-max">
        <!-- <div className="flex flex-col items-center justify-center gap-3 mb-4 h-max w-full">
          <div :class="cn('animate-pulse bg-muted rounded-md h-12 w-2/5', props.class)" />
          <div :class="cn('animate-pulse bg-muted rounded-sm w-3/4 h-6', props.class)" />
        </div> -->
        <div className="flex w-full justify-center text-center gap-4 h-full flex-wrap">
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
          <div :class="cn('animate-pulse bg-muted h-[6rem] border-border border-2 rounded-sm p-1 w-[20rem]', props.class)" />
        </div>
        <!-- <div className="flex gap-4 justify-center items-center">
          <div :class="cn('animate-pulse bg-muted w-[5rem] h-[2.5rem] rounded-sm p-1', props.class)" />
          <div :class="cn('animate-pulse bg-muted w-[2rem] h-[2.5rem] rounded-sm p-1', props.class)" />
          <div :class="cn('animate-pulse bg-muted w-[5rem] h-[2.5rem] rounded-sm p-1', props.class)" />
        </div> -->
      </div>
      <!-- <div className="flex flex-col w-full h-[10rem] items-center justify-center gap-4 mt-4 p-2">
        <div className="flex w-full gap-6 text-[0.7rem] justify-center">
          <div :class="cn('animate-pulse bg-muted w-[10rem] max-sm:w-[8rem] h-10 rounded-sm p-1', props.class)" />
          <div :class="cn('animate-pulse bg-muted w-[10rem] max-sm:w-[8rem] h-10 rounded-sm p-1', props.class)" />
        </div>
        <div className="flex w-full justify-around">
          <div :class="cn('animate-pulse bg-muted w-[10rem] max-sm:w-[8rem] h-10 rounded-sm p-1', props.class)" />
          <div :class="cn('animate-pulse bg-muted w-[10rem] max-sm:w-[8rem] h-10 rounded-sm p-1', props.class)" />
        </div>
      </div> -->
    </div>
</template>
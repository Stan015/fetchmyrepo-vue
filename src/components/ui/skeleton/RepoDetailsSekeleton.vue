<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <section class="flex w-full pt-20 justify-center">
        <div class="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-2">
          <div class="flex flex-col gap-2 w-full h-max mb-4" >
            <div :class="cn('animate-pulse rounded-md bg-muted w-full h-10', props.class)"/>
            <div :class="cn('animate-pulse rounded-md bg-muted w-full h-6', props.class)" />
          </div>
          <div class="grid w-full grid-cols-2 max-sm:grid-cols-1 items-center text-center gap-4">
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
            <div :class="cn('animate-pulse bg-muted h-10 border-border border-2 rounded-sm p-1', props.class)" />
          </div>

          <div class="">
            <div :class="cn('animate-pulse rounded-md bg-muted w-32 h-10', props.class)" />
          </div>
        </div>
      </section>
</template>

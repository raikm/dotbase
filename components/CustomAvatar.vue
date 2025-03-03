<template>
  <div
    class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-slate-100 dark:hover:bg-surface-800 cursor-pointer transition-colors duration-200"
  >
    <BoringAvatar variant="beam" :name="effectiveSeedId" class="mr-2" />
    <span class="inline-flex flex-col items-start">
      <span class="font-bold"> {{ firstName }} {{ lastName }} </span>
      <span class="text-sm">{{ role }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BoringAvatar from "vue-boring-avatars";

interface Props {
  firstName: string;
  lastName: string;
  role: string;
}

const props = defineProps<Props>();

const effectiveSeedId = computed(() => `${props.firstName} ${props.lastName}`);
</script>

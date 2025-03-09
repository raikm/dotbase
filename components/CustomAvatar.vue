<template>
  <div
    class="dark:hover:bg-surface-800 relative flex w-full cursor-pointer items-start overflow-hidden border-0 bg-transparent p-2 pl-4 transition-colors duration-200 hover:bg-slate-100"
  >
    <BoringAvatar variant="beam" :name="effectiveSeedId" class="mr-2" />
    <span class="inline-flex flex-col items-start">
      <span class="font-bold"> {{ firstName }} {{ lastName }} </span>
      <span class="text-sm">{{ role }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BoringAvatar from 'vue-boring-avatars'

interface Props {
  firstName: string
  lastName: string
  role: string
}

const props = defineProps<Props>()

const effectiveSeedId = computed(() => `${props.firstName} ${props.lastName}`)
</script>

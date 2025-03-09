<template>
  <div class="flex h-screen gap-4 overflow-hidden bg-slate-100 p-4">
    <DotMenu v-if="user" :user="user" class="h-full" />

    <div
      class="h-full flex-1 overflow-hidden rounded border border-slate-200 bg-white p-4"
    >
      <DotBreadcrumb :home="home" :items="items" />
      <div class="h-full overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '~/types/User'

const route = useRoute()

const { data: user } = await useFetch<User>(
  '/api/user/720072c1-47d9-4f2f-b2ba-e8ec0e8dee42',
)

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const items = computed(() => {
  if (route.path === '/settings') {
    return [{ label: 'Settings', route: '/settings' }]
  }
  if (route.path.startsWith('/data-hub')) {
    return [{ label: 'Data Hub', route: '/data-hub' }]
  }

  if (route.path === '/') {
    return [{ label: 'Home', route: '/' }]
  }
  return []
})
</script>

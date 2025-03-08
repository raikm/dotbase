<template>
  <div class="flex bg-slate-100 gap-4 p-4 h-screen">
    <DotMenu v-if="user"  :user="user" class="h-full " />

    <div class="flex-1 p-4 bg-white border border-slate-200 rounded ">
      <DotBreadcrumb :home="home" :items="items" />
      <div class="px-4 ">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "~/types/User";

const route = useRoute();

const { data: user } = await useFetch<User>("/api/user/720072c1-47d9-4f2f-b2ba-e8ec0e8dee42");

const home = ref({
  icon: "pi pi-home",
  route: "/",
});

const items = computed(() => {
  if (route.path === "/settings") {
    return [{ label: "Settings", route: "/settings" }];
  }
  if (route.path === "/data-hub") {
    return [{ label: "Data Hub", route: "/data-hub" }];
  }
  if (route.path === "/") {
    return [{ label: "Home", route: "/" }];
  }
  return [];
});
</script>

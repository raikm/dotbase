<template>
  <Menu :model="items" class="w-full md:w-60 py-4">
    <template #start>
      <span class="inline-flex items-center gap-1 px-2 py-2">
        <span class="text-xl font-semibold">Dotbase Coding Challenge</span>
      </span>
    </template>
    <template #submenulabel="{ item }">
      <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <NuxtLink
        v-ripple
        class="flex items-center"
        :to="item.to"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </template>
    <template #end>
      <CustomAvatar
        :first-name="user.firstName"
        :last-name="user.lastName"
        :role="user.role"
      />
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomAvatar from "./CustomAvatar.vue";

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface Props {
  user: User;
}

const { user } = defineProps<Props>();

const items = ref([
  { separator: true },
  {
    items: [
      { label: "Home", icon: "pi pi-home", to: "/" },
      { label: "Data Hub", icon: "pi pi-map", to: "/data-hub" },
    ],
  },
  {
    label: "Profile",
    items: [{ label: "Settings", icon: "pi pi-cog", to: "/settings" }],
  },
  { separator: true },
]);
</script>

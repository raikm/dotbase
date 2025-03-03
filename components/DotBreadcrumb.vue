<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon, 'text-color']" />
          <span class="text-primary font-semibold">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="text-surface-700 dark:text-surface-0">
          {{ item.label }}
        </span>
      </a>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
interface MenuItem {
  label?: string;
  route?: string;
  url?: string;
  target?: string;
  icon?: string;
}

interface Props {
  home: MenuItem;
  items: MenuItem[];
}

defineProps<Props>();
</script>

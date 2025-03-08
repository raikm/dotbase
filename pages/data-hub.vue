<template>
  <div>
    <h1>Data Hub</h1>
    <h2>Questionnaires</h2>
    <div v-if="questionnaires" class="flex">
      <DataTable class="flex-2/3" :value="questionnaires">
        <Column field="id" header="ID" />
        <Column field="lastUpdated" header="Last updated" />
        <Column field="status" header="Status" />
      </DataTable>
      <div class="flex-1/3">
        <!-- Diagram here -->
      </div>
    </div>
    <div v-else>
      <!-- Loading or no quest. -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Questionnaire } from '~/types/Questionnaire'
const questionnaires = ref<Questionnaire[]>()
const { data } = await useFetch<Questionnaire[]>(`/api/questionnaires`)
questionnaires.value = data.value || []

</script>

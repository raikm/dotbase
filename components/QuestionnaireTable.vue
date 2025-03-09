<template>
  <div>
    <DataTable
      :value="questionnaires"
      show-gridlines
      selection-mode="single"
      data-key="id"
      @row-select="openQuestionnaireResponses"
    >
      <Column field="description" header="Name" />
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import type { Questionnaire } from 'fhir/r5'

const questionnaires = ref<Questionnaire[]>([])
const { data } = await useFetch<Questionnaire[]>('/api/questionnaires')
questionnaires.value = data.value || []

const openQuestionnaireResponses = (event: { data: Questionnaire }) => {
  navigateTo(`/data-hub/${event.data.id}/${event.data.name}`)
}
</script>

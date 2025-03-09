<template>
  <div>
    <DataTable
      v-if="questionnaires"
      :value="questionnaires"
      show-gridlines
      selection-mode="single"
      data-key="id"
      @row-select="openQuestionnaireResponses"
    >
      <Column field="description" header="Name" />
    </DataTable>
    <div v-else>No questionnaires</div>
  </div>
</template>

<script lang="ts" setup>
import type { Questionnaire } from 'fhir/r5'

const { data: questionnaires } = await useFetch<Questionnaire[]>(
  '/api/questionnaires',
)

const openQuestionnaireResponses = (event: { data: Questionnaire }) => {
  navigateTo(`/data-hub/${event.data.id}/${event.data.name}`)
}
</script>

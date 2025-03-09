<template>
  <div class="flex h-full flex-col">
    <Toast />
    <h2>Questionnaire Responses</h2>
    <div
      v-if="questionnaireResponses"
      class="flex flex-1 overflow-hidden pb-12"
    >
      <div class="flex-1">
        <DataTable
          v-model:selection="selectedQuestionnaireResponse"
          show-gridlines
          selection-mode="single"
          data-key="id"
          scrollable
          scroll-height="flex"
          :value="questionnaireResponses"
        >
          <Column
            field="id"
            header="ID"
            style="
              max-width: 50px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
          />
          <Column field="meta.lastUpdated" header="Last updated">
            <template #body="{ data }">
              <span>{{
                new Date(data.meta.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}</span>
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="{ data }">
              <Tag
                :value="data.status"
                :severity="getStatusLabel(data.status)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="flex-1">
        <PROMISChart
          v-if="selectedQuestionnaireResponse"
          :selected-questionnaire-response="selectedQuestionnaireResponse"
        />
        <div v-else class="grid h-full place-items-center">
          <p class="text-gray-500 italic">Select Questionnaire Response</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No questionnaire responses</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { QuestionnaireResponse } from 'fhir/r5'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const toast = useToast()

const selectedQuestionnaireResponse = ref<QuestionnaireResponse>()

const { data: questionnaireResponses, error } = await useFetch<
  QuestionnaireResponse[]
>(`/api/questionnaireResponses/${route.params.questionnaireId}`)

onMounted(() => {
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value.message,
    })
  }
})

const getStatusLabel = (status: QuestionnaireResponse['status']) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'in-progress':
      return 'warn'
    case 'entered-in-error':
      return 'danger'
    case 'amended':
      return 'warn'
    case 'stopped':
      return 'danger'
    default:
      return 'info'
  }
}
</script>

<template>
  <div class="p-4">
    <Chart type="radar" :data="chartData" />
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart'
import fhirpath from 'fhirpath'

import type { Questionnaire, QuestionnaireResponse } from 'fhir/r5'

const { selectedQuestionnaireResponse } = defineProps<{
  selectedQuestionnaireResponse: QuestionnaireResponse
}>()

const questionnaire = ref<Questionnaire | null>()
const chartData = ref()

onMounted(async () => {
  await getQuestionnaireFromResponse()
  await extractScoreData()
})

watch(
  () => selectedQuestionnaireResponse,
  async () => {
    await getQuestionnaireFromResponse()
    await extractScoreData()
  },
)

const getQuestionnaireFromResponse = async () => {
  const questionnaireReference = await fhirpath.evaluate(
    selectedQuestionnaireResponse,
    "_questionnaire.extension.where(url='https://dotbase.org/fhir/StructureDefinition/questionnaire-canonical-reference').valueReference.reference",
  )
  // TODO check for better way to get questionnaire id
  const questionnaireId = questionnaireReference[0].split('/').pop()

  questionnaire.value = await $fetch<Questionnaire>(
    `/api/questionnaire/${questionnaireId}`,
  )
}

const extractScoreData = async () => {
  if (!questionnaire.value) return

  // TODO extract data more accurately
  // TODO typesafe
  const scoreGroups = await fhirpath.evaluate(
    questionnaire.value,
    "item.where(type='group' and text.endsWith('Score'))",
  )

  const scoreResults: number[] = []

  for (const scoreGroup of scoreGroups) {
    // TODO extract data more accurately
    // scoreGroup.item[0].linkId == t-score linkId
    const scorePath = `item.where(linkId='${scoreGroup.linkId}').item.where(linkId='${scoreGroup.item[0].linkId}').answer.valueDecimal`

    const result = await fhirpath.evaluate(
      selectedQuestionnaireResponse,
      scorePath,
    )
    scoreResults.push(result[0])
  }

  // TODO if scoreGroup has no answer then don't display in diagram
  chartData.value = setChartData(
    scoreGroups.map((c) => c.text),
    scoreResults,
    questionnaire.value?.description,
  )
}

const setChartData = (
  labels: string[],
  data: number[],
  description?: string,
) => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    labels: labels,
    datasets: [
      {
        label: description,
        data: data,
        borderColor: documentStyle.getPropertyValue('--p-gray-400'),
        pointBackgroundColor: documentStyle.getPropertyValue('--p-gray-400'),
        pointBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
      },
    ],
  }
}
</script>

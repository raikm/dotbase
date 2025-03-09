<template>
  <div class="p-4">
    <Chart type="radar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart'
import fhirpath from 'fhirpath'
import type { Questionnaire, QuestionnaireResponse } from 'fhir/r5'

const route = useRoute()

const { selectedQuestionnaireResponse } = defineProps<{
  selectedQuestionnaireResponse: QuestionnaireResponse
}>()

const questionnaire = ref<Questionnaire | null>()
const chartData = ref()
const chartOptions = ref()
const chartLabels = ref<string[]>([])
const chartValues = ref<number[]>([])
const chartDescription = ref<string | undefined>()

onMounted(async () => {
  await createChartDiagramBasedOnResponses()
})

watch(
  () => selectedQuestionnaireResponse,
  async () => {
    await createChartDiagramBasedOnResponses()
  },
)

const createChartDiagramBasedOnResponses = async () => {
  await getQuestionnaire()
  await getScoreResultsFromQuestionnaireResponse()

  chartData.value = setChartData()
  chartOptions.value = {
    scales: {
      r: {
        ticks: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
  }
}

const getQuestionnaire = async () => {
  questionnaire.value = await $fetch<Questionnaire>(
    `/api/questionnaires/${route.params.questionnaireId}`,
  )
}

const getScoreResultsFromQuestionnaireResponse = async () => {
  if (!questionnaire.value) return

  const isInverted = (loincCode: string): boolean => {
    const invertedScores = ['71959-1'] // Physical Function Score LOINC
    return invertedScores.includes(loincCode)
  }

  // TODO typesafe
  const scoreGroups = await fhirpath.evaluate(
    questionnaire.value,
    "item.where(type='group' and linkId.endsWith('-score-group'))",
  )

  const scoreResults: number[] = []

  for (const scoreGroup of scoreGroups) {
    // TODO extract data more accurately / save
    const scoreValue = await fhirpath.evaluate(
      selectedQuestionnaireResponse,
      `item.where(linkId='${scoreGroup.linkId}').item.where(linkId='${scoreGroup.item[0].linkId}').answer.valueDecimal`,
    )
    // TODO typesafe
    if (isInverted(scoreGroup.item[0].code[0].code)) {
      scoreValue[0] = 100 - scoreValue[0]
    }

    scoreResults.push(scoreValue[0])
  }

  // TODO if scoreGroup has no answer then don't display in diagram

  chartLabels.value = scoreGroups.map((scoreGroup) => scoreGroup.item[0].text)
  chartValues.value = scoreResults
  chartDescription.value = questionnaire.value.description
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    labels: chartLabels.value,
    datasets: [
      {
        label: chartDescription.value,
        data: chartValues.value,
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

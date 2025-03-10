<template>
  <div class="p-4">
    <Chart type="radar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart'
import fhirpath from 'fhirpath'
import type {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireResponse,
} from 'fhir/r5'

const route = useRoute()

const { selectedQuestionnaireResponse } = defineProps<{
  selectedQuestionnaireResponse: QuestionnaireResponse
}>()

const chartData = ref()
const chartOptions = ref()

const getQuestionnaire = async () => {
  try {
    return await $fetch<Questionnaire>(
      `/api/questionnaires/${route.params.questionnaireId}`,
    )
  } catch (error) {
    console.error(error)
  }
}

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
  const questionnaire = await getQuestionnaire()
  if (!questionnaire) return

  await processScoreResultsFromQuestionnaireResponse(questionnaire)

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

const processScoreResultsFromQuestionnaireResponse = async (
  questionnaire: Questionnaire,
) => {
  if (!questionnaire) return

  // TODO chatch error if processing fails

  // Quick workaround to check if the score is inverted based on LOINC code
  const isInverted = (loincCode?: string): boolean => {
    if (!loincCode) return false
    const invertedScores = ['71959-1'] // Physical Function Score LOINC
    return invertedScores.includes(loincCode)
  }
  // TODO get relevant LOINC-Codes from loinc.org/62337-1 to match them with selectedQuestionnaireResponse items
  const scoreGroups = (await fhirpath.evaluate(
    questionnaire,
    "item.where(type='group' and linkId.endsWith('-score-group'))",
  )) as QuestionnaireItem[]

  const scoreGroupResults: number[] = []
  // TODO room for improvement: if scoreGroup in response not found or value not exist then don't include score in diagram -> solve with a collection

  for (const scoreGroup of scoreGroups) {
    if (scoreGroup.item != undefined) {
      const scoreValue = (await fhirpath.evaluate(
        selectedQuestionnaireResponse,
        `item.where(linkId='${scoreGroup.linkId}').item.where(linkId='${scoreGroup.item[0].linkId}').answer.valueDecimal`,
      )) as number[]

      if (isInverted(scoreGroup.item![0].code![0].code)) {
        scoreValue[0] = 100 - scoreValue[0]
      }

      scoreGroupResults.push(scoreValue[0])
    }
  }

  setChartData(
    scoreGroups.map((scoreGroup) => scoreGroup.text ?? ''),
    scoreGroupResults,
    questionnaire.description,
  )
}

const setChartData = (
  labels: string[],
  data: number[],
  description?: string,
) => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  chartData.value = {
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

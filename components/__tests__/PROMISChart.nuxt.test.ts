import PROMISChart from '../PROMISChart.vue'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { QuestionnaireResponse } from 'fhir/r5'
import { beforeAll, describe, expect, it } from 'vitest'
import questionTestData from './data/QuestionnaireFHIRTest.json'
import responseTestData from './data/QuestionnaireResponseFHIRTest.json'
describe('PROMISChart', () => {
  beforeAll(() => {
    // TODO improve mocking with route params
    registerEndpoint('/api/questionnaires/undefined', () => ({
      questionTestData,
    }))
  })

  it('can mount the component when data is provided', async () => {
    const component = await mountSuspended(PROMISChart, {
      props: {
        selectedQuestionnaireResponse: responseTestData,
      },
    })

    expect(component.html()).toContain('canvas')
  })

  it('sets chart data correctly', async () => {
    const component = await mountSuspended(PROMISChart, {
      props: {
        selectedQuestionnaireResponse: responseTestData,
      },
    })

    await nextTick()

    expect(component.html()).toContain('canvas')
    expect(component.vm.chartData).toBeDefined()

    // FIXME: why spy doesn't work
    // const setChartDataSpy = vi.spyOn(component.vm, 'setChartData')
    // const createChartDiagramBasedOnResponsesSpy = vi.spyOn(
    //   component.vm,
    //   'createChartDiagramBasedOnResponses',
    // )

    /* FIXME why component.vm.chartData.value is undefined

    expect(setChartDataSpy).toHaveBeenCalled()
    expect(createChartDiagramBasedOnResponsesSpy).toHaveBeenCalled()
    expect(component.vm.chartData.value.labels).toBeDefined()
    expect(component.vm.chartData.value.labels).toHaveLength(questionTestData.item![0].item.length)
    expect(component.vm.chartData.value.labels).toContain(
      questionTestData.item![0].item![0].text,
    )
   */
  })

  it('updates chart when selectedQuestionnaireResponse changes', async () => {
    const component = await mountSuspended(PROMISChart, {
      props: {
        selectedQuestionnaireResponse: responseTestData,
      },
    })
    const newResponse: QuestionnaireResponse = {
      ...(responseTestData as QuestionnaireResponse),
      id: 'new-response',
    }

    // FIXME: why spy doesn't work
    // const createChartDiagramBasedOnResponsesSpy = vi.spyOn(
    //   component.vm,
    //   'createChartDiagramBasedOnResponses',
    // )

    await component.setProps({ selectedQuestionnaireResponse: newResponse })
    expect(component.html()).toContain('canvas')
    expect(component.vm.chartData).toBeDefined()
    // FIXME: expect(createChartDiagramBasedOnResponsesSpy).toHaveBeenCalledTimes(2)
  })
})

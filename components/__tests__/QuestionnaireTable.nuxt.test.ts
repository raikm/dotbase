import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import type { Questionnaire } from 'fhir/r5'
import { QuestionnaireTable } from '#components'

describe('QuestionnaireTable', () => {
  const mockedQuestionnaires: Questionnaire[] = [
    {
      resourceType: 'Questionnaire',
      id: 'example-questionnaire-1',
      status: 'active',
      item: [],
    },
    {
      resourceType: 'Questionnaire',
      id: 'example-questionnaire-2',
      status: 'active',
      item: [],
    },
  ]

  it('can mount the component with questionnaires', async () => {
    const component = await renderSuspended(QuestionnaireTable, {
      global: {
        mocks: {
          questionnaires: mockedQuestionnaires,
        },
      },
    })

    expect(component.html()).toContain('table')
  })

  it('can mount the component without questionnaires', async () => {
    const component = await renderSuspended(QuestionnaireTable)

    expect(component.html()).not.toContain('table')
    expect(component.html()).toContain('No questionnaires')
  })

  it('renders the correct number of rows', async () => {
    const component = await renderSuspended(QuestionnaireTable, {
      global: {
        mocks: {
          questionnaires: mockedQuestionnaires,
        },
      },
    })

    const rows = component.container.querySelectorAll('tr')
    expect(rows.length).toBe(mockedQuestionnaires.length + 1)
  })
})

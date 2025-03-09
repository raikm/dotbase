import { FileQuestionnaireResponseDbService } from '~/server/services/questionnaireResponses/FileQuestionnaireResponseService'

export default defineEventHandler(async (event) => {
  const questionnaireId = getRouterParam(event, 'questionnaireId')

  if (!questionnaireId) {
    return new Response('Questionnaire ID is required', { status: 400 })
  }

  const questionnaireResponseService = new FileQuestionnaireResponseDbService()
  return await questionnaireResponseService.getAll(questionnaireId)
})

import { FileQuestionnaireDbService } from '~/server/services/questionnaires/FileQuestionnaireService'

export default defineEventHandler(async (event) => {
  const questionnaireId = getRouterParam(event, 'questionnaireId')
  if (!questionnaireId) {
    return new Response('Questionnaire ID is required', { status: 400 })
  }
  const questionnaireService = new FileQuestionnaireDbService()

  const result = await questionnaireService.getById(questionnaireId)
  if (!result) {
    return new Response('Questionnaire not found', { status: 404 })
  }

  return result
})

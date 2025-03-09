import { FileQuestionnaireDbService } from '~/server/services/questionnaires/FileQuestionnaireService'

export default defineEventHandler(async (event) => {
  const questionnaireId = getRouterParam(event, 'questionnaireId')
  if (!questionnaireId) {
    return new Response('Questionnaire ID is required', { status: 400 })
  }
  const questionnaireService = new FileQuestionnaireDbService()

  // TODO Error Handling
  return await questionnaireService.getById(questionnaireId)
})

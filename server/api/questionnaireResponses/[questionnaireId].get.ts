import { FileQuestionnaireResponseDbService } from '~/server/services/questionnaireResponses/FileQuestionnaireResponseService'

export default defineEventHandler(async (event) => {
  // TODO use plugins?
  const questionnaireId = getRouterParam(event, 'questionnaireId')
  const questionnaireResponseService = new FileQuestionnaireResponseDbService()
  return await questionnaireResponseService.getAll(questionnaireId)
})

import { FileQuestionnaireResponseDbService } from '~/server/services/questionnaireResponses/FileQuestionnaireResponseService'

export default defineEventHandler(async () => {
  // TODO use plugins?
  const questionnaireResponseService = new FileQuestionnaireResponseDbService()
  return questionnaireResponseService.getAll()
})

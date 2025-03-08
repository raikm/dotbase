import { QuestionnaireDbService as QuestionnaireResponseDbService } from '~/server/services/questionnaireResponses/QuestionnaireResponseDbService'

export default defineEventHandler(async () => {
  const questionnaireService = new QuestionnaireResponseDbService()
  return questionnaireService.getAll()
})

import { QuestionnaireDbService } from '~/server/services/questionnaires/QuestionnaireDbService'

export default defineEventHandler(async () => {
  const questionnaireService = new QuestionnaireDbService()
  return questionnaireService.getAll()
})

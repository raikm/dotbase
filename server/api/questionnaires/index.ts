import { FileQuestionnaireDbService } from '~/server/services/questionnaires/FileQuestionnaireService'

export default defineEventHandler(async () => {
  const questionnaireService = new FileQuestionnaireDbService()
  return await questionnaireService.getAll()
})

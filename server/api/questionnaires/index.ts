import { FileQuestionnaireDbService } from '~/server/services/questionnaires/FileQuestionnaireService'

export default defineEventHandler(async () => {

  const questionnaireService = new FileQuestionnaireDbService()

  // TODO Error Handling
  return await questionnaireService.getAll()
})

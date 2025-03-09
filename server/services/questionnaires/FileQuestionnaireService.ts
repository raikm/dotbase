import type { Questionnaire } from 'fhir/r5'
import type { IQuestionnaireDbService } from './IQuestionnaireDbService'

export class FileQuestionnaireDbService implements IQuestionnaireDbService {
  async getById(id: string): Promise<Questionnaire | undefined> {
    return database.questionnaires.findLast(
      (questionnaire) => questionnaire.id === id,
    )
  }
}

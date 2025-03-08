import type { QuestionnaireResponse } from 'fhir/r5'
import type { IQuestionnaireResponseDbService } from './IQuestionnaireResponseDbService'

export class FileQuestionnaireResponseDbService
  implements IQuestionnaireResponseDbService
{
  async getAll(): Promise<QuestionnaireResponse[]> {
    return database.questionnaireResponses
  }

  async getById(id: string): Promise<QuestionnaireResponse | undefined> {
    return database.questionnaireResponses.findLast(
      (questionnaire) => questionnaire.id === id,
    )
  }
}

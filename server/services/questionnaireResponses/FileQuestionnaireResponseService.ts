import type { QuestionnaireResponse } from 'fhir/r5'
import type { IQuestionnaireResponseDbService } from './IQuestionnaireResponseDbService'

export class FileQuestionnaireResponseDbService
  implements IQuestionnaireResponseDbService
{
  async getAll(questionnaireId?: string): Promise<QuestionnaireResponse[]> {
    if (!questionnaireId) {
      return database.questionnaireResponses
    }
    return database.questionnaireResponses.filter(
      (questionnaire) =>
        questionnaire._questionnaire?.extension?.[0]?.valueReference
          ?.reference === `Questionnaire/${questionnaireId}`,
    )
  }

  async getById(id: string): Promise<QuestionnaireResponse | undefined> {
    return database.questionnaireResponses.findLast(
      (questionnaire) => questionnaire.id === id,
    )
  }
}

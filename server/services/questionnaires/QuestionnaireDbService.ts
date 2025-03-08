import type { Questionnaire } from '~/types/Questionnaire'
import type { IQuestionnaireDbService } from './IQuestionnaireDbService'

export class QuestionnaireDbService implements IQuestionnaireDbService {
  async getAll(): Promise<Questionnaire[]> {
    return database.questionnaires
  }

  async getById(id: string): Promise<Questionnaire | undefined> {
    return database.questionnaires.findLast((questionnaire) => questionnaire.id === id)
  }
}

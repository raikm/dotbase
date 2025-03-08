import type { Questionnaire } from '~/types/Questionnaire'

export interface IQuestionnaireDbService {
  getAll(): Promise<Questionnaire[]>
  getById(id: string): Promise<Questionnaire | undefined>
}

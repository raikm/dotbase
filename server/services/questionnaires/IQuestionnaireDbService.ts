import type { Questionnaire } from 'fhir/r5'

export interface IQuestionnaireDbService {
  getById(id: string): Promise<Questionnaire | undefined>
  getAll(): Promise<Questionnaire[]>
}

import type { QuestionnaireResponse } from 'fhir/r5'

export interface IQuestionnaireResponseDbService {
  getAll(questionnaireId?: string): Promise<QuestionnaireResponse[]>
  getById(id: string): Promise<QuestionnaireResponse | undefined>
}

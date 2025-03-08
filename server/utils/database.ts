import type { User } from '~/types/User'
import fs from 'fs'
import path from 'path'
import type { QuestionnaireResponse } from 'fhir/r5'

interface Database {
  users: User[]
  questionnaireResponses: QuestionnaireResponse[]
}

// TODO verify if cleanest way to get the path with this conditions
const questionnaireResponsesDir = path.join(process.cwd(), 'server/fhir/QuestionnaireResponses')

const questionnaireResponses: QuestionnaireResponse[] = fs
  .readdirSync(questionnaireResponsesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const filePath = path.join(questionnaireResponsesDir, file)
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContents)
  })

export const database: Database = {
  users: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      id: '720072c1-47d9-4f2f-b2ba-e8ec0e8dee42',
      role: 'Admin',
      version: 1,
    },
  ],
  questionnaireResponses,
}

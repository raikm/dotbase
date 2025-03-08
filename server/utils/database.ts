import type { Questionnaire } from '~/types/Questionnaire'
import type { User } from '~/types/User'

interface Database {
  users: User[]
  questionnaires: Questionnaire[]
}

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
  questionnaires: [
    {
      id: '720072c1-47d9-4f2f-b2ba-e8ec0e8dee42',
      lastUpdated: new Date(),
      status: 'Draft',
    },
  ],
}

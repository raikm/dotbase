import type { User } from '~/types/User'

interface Database {
  users: User[]
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
}

import type { User } from '~/types/User'
import type { IUserDbService } from './IUserDbService'

export class UserDbService implements IUserDbService {
  async getAll(): Promise<User[]> {
    return database.users
  }

  async getById(id: string): Promise<User | undefined> {
    return database.users.findLast((user) => user.id === id)
  }

  async save(user: User): Promise<User> {
    database.users.push(user)
    return user
  }
}

import type { User } from '~/types/User'

export interface IUserDbService {
  getAll(): Promise<User[]>
  getById(id: string): Promise<User | undefined>
  save(user: User): Promise<User>
}

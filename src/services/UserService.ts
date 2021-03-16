import { readDB } from '../utils/readFile'
import { User } from '../model/User'

type FilterFunction = (value: User, index: number) => boolean

export class UserService {
  static find = async (filter?: FilterFunction): Promise<User[]> => {
    const users = await readDB<User>('users')

    return filter ? users.filter(user => filter(user, user.index)) : users
  }

  static findById = async (id: string): Promise<User | undefined> => {
    const users = await readDB<User>('users')

    return users.find(user => user._id === id)
  }
}

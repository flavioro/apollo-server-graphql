import { User } from '../model/User'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { UserService } from '../services/UserService'
import { buildNameRegex } from '../utils/regex'

@Resolver(() => User)
export class UserResolver {

  @Query(() => [User])
  async list(@Arg('name', { nullable: true }) name?: string) {
    if (name) {
      const regex = buildNameRegex(name)

      return UserService.find(user => regex.test(user.name))
    }

    return UserService.find()
  }

  @FieldResolver()
  async friends(
    @Root() user: User,
    @Arg('name', { nullable: true }) name?: string,
  ) {
    if (name) {
      const regex = buildNameRegex(name)

      return user.friends.filter(friend => regex.test(friend.name))
    }

    return user.friends
  }

  @Query(() => User)
  async find(@Arg('id') id: string) {
    return UserService.findById(id)
  }
}

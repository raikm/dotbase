import { UserDbService } from '~/server/services/user/UserDbService'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')

  if (!userId) {
    return new Response('User ID is required', { status: 400 })
  }

  const userService = new UserDbService()

  const user = await userService.getById(userId)
  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  return user
})

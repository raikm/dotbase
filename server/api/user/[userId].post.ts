import { UserDbService } from '~/server/services/user/UserDbService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = getRouterParam(event, 'userId')

  if (!userId) {
    return new Response('User ID is required', { status: 400 })
  }

  const userService = new UserDbService()

  const oldUser = await userService.getById(userId)

  if (!oldUser) {
    return new Response('User not found', { status: 404 })
  }

  const updatedUser = {
    ...oldUser,
    ...body,
    version: oldUser.version + 1,
  }

  await userService.save(updatedUser)

  return updatedUser
})

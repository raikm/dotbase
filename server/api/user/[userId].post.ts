import { getUser, saveUser } from "../../utils/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = getRouterParam(event, "userId");

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  const oldUser = await getUser(userId);

  if (!oldUser) {
    return new Response("User not found", { status: 404 });
  }

  const updatedUser = {
    ...oldUser,
    ...body,
    version: oldUser.version + 1,
  };

  saveUser(updatedUser);

  return updatedUser;
});

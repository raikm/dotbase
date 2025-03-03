import { getUser } from "../utils/database";

export default defineEventHandler(async () => {
  return getUser("720072c1-47d9-4f2f-b2ba-e8ec0e8dee42");
});

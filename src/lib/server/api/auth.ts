import type { Auth } from "$lib/types/auth"
import { post } from "."

export const login = async (customFetch: typeof fetch, authObject: Auth) => {
  const res = await post(customFetch, "/auth/login", authObject)
  return res;
}

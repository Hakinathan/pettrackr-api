/* eslint-disable prettier/prettier */
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

function getUserId(auth: AuthContract) {
  const userId = auth.user?.id
  if (!userId) {
    throw new Error()
  }
  return userId
}

export { getUserId }

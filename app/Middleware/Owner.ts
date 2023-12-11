import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Owner {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    await next()
  }
}

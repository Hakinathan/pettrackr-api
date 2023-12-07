import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index({ response }: HttpContextContract) {
    const pets = await Pet.query()
      .select('name', 'birth_date')
      .where('user_id', 1)
      .preload('weights')
      .preload('followers')

    return response.ok({
      status: 200,
      data: pets,
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

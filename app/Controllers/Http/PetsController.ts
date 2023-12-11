import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePetValidator from 'App/Validators/CreatePetValidator'
import UpdatePetValidator from 'App/Validators/UpdatePetValidator'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index({ response }: HttpContextContract) {
    const pets = await Pet.query()
      .select('id', 'name', 'birth_date', 'type_id')
      .preload('type', (query) => {
        query.select('id', 'type')
      })

    return response.ok({
      status: 200,
      success: true,
      message: 'Les animaux ont bien été récupérés.',
      data: pets,
    })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(CreatePetValidator)
    const pet = await Pet.create(data)

    await auth.user?.related('pets').attach({
      [pet.id]: {
        owner: true,
      },
    })

    return response.created({
      status: 201,
      success: true,
      message: "L'animal a bien été créé.",
      data: pet,
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const pet = await Pet.query()
      .preload('type', (query) => {
        query.select('id', 'type')
      })
      .preload('weights', (query) => {
        query.select('id', 'weight')
      })
      .where('id', params.id)
      .firstOrFail()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été récupéré.",
      data: pet,
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdatePetValidator)
    const pet = await Pet.findOrFail(params.id)

    await pet.merge(data).save()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été mis à jour.",
      data: pet,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)

    await pet.delete()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été supprimé.",
    })
  }

  public async follow({ auth, params }: HttpContextContract) {
    const user = auth.user!
    const pet = await Pet.findOrFail(params.id)

    await user.related('pets').attach({
      [pet.id]: {
        owner: false,
      },
    })

    return {
      status: 200,
      success: true,
      message: `Vous suivez ${pet.name}.`,
    }
  }
}

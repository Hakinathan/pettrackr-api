import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePetValidator from 'App/Validators/CreatePetValidator'
import UpdatePetValidator from 'App/Validators/UpdatePetValidator'
import Pet from 'App/Models/Pet'
import { getUserId } from 'App/utils'

export default class PetsController {
  public async index({ response, auth }: HttpContextContract) {
    const userId = getUserId(auth)

    const pets = await Pet.query()
      .select('pets.id', 'pets.name', 'pets.birth_date', 'pets.type_id')
      .from('pets')
      .preload('type', (query) => {
        query.select('id', 'type')
      })
      .join('user_pet', 'pets.id', 'user_pet.pet_id')
      .where('user_pet.user_id', userId)

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

    await auth.user?.related('pets').attach([pet.id])

    return response.created({
      status: 201,
      success: true,
      message: "L'animal a bien été créé.",
      data: pet,
    })
  }

  public async show({ auth, response, params }: HttpContextContract) {
    const userId = getUserId(auth)

    const pet = await Pet.query()
      .select('pets.id', 'pets.name', 'pets.birth_date', 'pets.type_id')
      .from('pets')
      .preload('type', (query) => {
        query.select('id', 'type')
      })
      .preload('weights')
      .join('user_pet', 'pets.id', 'user_pet.pet_id')
      .where('user_pet.user_id', userId)
      .andWhere('pets.id', params.id)
      .firstOrFail()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été récupéré.",
      data: pet,
    })
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const userId = getUserId(auth)

    const data = await request.validate(UpdatePetValidator)
    const pet = await Pet.query()
      .select('pets.id', 'pets.name', 'pets.birth_date', 'pets.type_id')
      .from('pets')
      .preload('type', (query) => {
        query.select('id', 'type')
      })
      .preload('weights')
      .join('user_pet', 'pets.id', 'user_pet.pet_id')
      .where('user_pet.user_id', userId)
      .andWhere('pets.id', params.id)
      .firstOrFail()

    await pet.merge(data).save()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été mis à jour.",
      data: pet,
    })
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const userId = getUserId(auth)

    const pet = await Pet.query()
      .select('pets.id', 'pets.name', 'pets.birth_date', 'pets.type_id')
      .from('pets')
      .preload('type', (query) => {
        query.select('id', 'type')
      })
      .preload('weights')
      .join('user_pet', 'pets.id', 'user_pet.pet_id')
      .where('user_pet.user_id', userId)
      .andWhere('pets.id', params.id)
      .firstOrFail()

    await auth.user?.related('pets').detach([pet.id])

    await pet.delete()

    return response.ok({
      status: 200,
      success: true,
      message: "L'animal a bien été supprimé.",
    })
  }
}

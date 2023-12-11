import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateWeightValidator from 'App/Validators/CreateWeightValidator'
import Pet from 'App/Models/Pet'
import Weight from 'App/Models/Weight'
import UpdateWeightValidator from 'App/Validators/UpdateWeightValidator'

export default class WeightsController {
  public async index({ params, response }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.pet_id)

    await pet.load('weights', (query) => {
      query.select('id', 'weight', 'updated_at')
    })

    return response.ok({
      status: 200,
      success: true,
      message: 'Les poids ont bien été récupérés.',
      data: pet.weights,
    })
  }

  public async store({ request, params, response }: HttpContextContract) {
    const data = await request.validate(CreateWeightValidator)

    const pet = await Pet.findOrFail(params.pet_id)

    const weight = new Weight()
    weight.weight = data.weight

    await pet.related('weights').save(weight)

    return response.created({
      status: 201,
      success: true,
      message: 'Le poids a bien été créé.',
      data: weight,
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Weight.query()
      .where('pet_id', params.pet_id)
      .andWhere('id', params.id)
      .firstOrFail()

    return response.ok({
      status: 200,
      success: true,
      message: 'Le poids a bien été récupéré.',
      data: data,
    })
  }

  public async update({ params, response, request }: HttpContextContract) {
    const data = await request.validate(UpdateWeightValidator)
    const weight = await Weight.query()
      .where('pet_id', params.pet_id)
      .andWhere('id', params.id)
      .firstOrFail()

    await weight.merge(data).save()

    return response.ok({
      status: 200,
      success: true,
      message: 'Le poids a bien été mis à jour.',
      data: weight,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const weight = await Weight.query()
      .where('pet_id', params.pet_id)
      .andWhere('id', params.id)
      .firstOrFail()

    await weight.delete()

    return response.ok({
      status: 200,
      success: true,
      message: 'Le poids a bien été supprimé.',
      data: weight,
    })
  }
}

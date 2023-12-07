import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })

      return response.ok({
        status: 200,
        success: true,
        data: {
          token: token,
        },
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        success: false,
        message: "Le mot de passe ou l'email est incorrect",
      })
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)
    const user = await User.create(data)

    return response.created({
      status: 201,
      success: true,
      message: 'Votre compte a été créé avec succès',
      data: user,
    })
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return response.ok({
      status: 200,
      success: true,
      message: 'Vous avez été déconnecté',
    })
  }
}

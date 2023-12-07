import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'email.required': "L'adresse email est obligatoire",
    'email.email': "L'adresse email doit être valide",
    'email.unique': "L'adresse email existe déjà",
    'password.required': 'Le mot de passe est obligatoire',
    'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères',
  }
}

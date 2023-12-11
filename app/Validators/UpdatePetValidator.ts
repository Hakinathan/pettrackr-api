import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.maxLength(75),
      rules.minLength(2),
      rules.alpha(),
    ]),
    birth_date: schema.date.optional({ format: 'dd-MM-yyyy' }, [rules.before('today')]),
    type_id: schema.number.optional([rules.exists({ table: 'types', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.maxLength': 'Le nom ne doit pas dépasser 75 caractères.',
    'name.minLength': 'Le nom doit contenir au moins 2 caractères.',
    'name.alpha': 'Le nom doit contenir uniquement des lettres.',
    'birth_date.format': 'La date de naissance doit être au format dd-MM-yyyy.',
    'birth_date.before': "La date de naissance doit être avant aujourd'hui.",
    'type_id.exists': "Le type n'existe pas.",
  }
}

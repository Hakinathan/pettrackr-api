import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePetValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(75), rules.minLength(2), rules.alpha()]),
    birth_date: schema.date({ format: 'dd-MM-yyyy' }, [rules.before('today')]),
    type_id: schema.number([rules.required(), rules.exists({ table: 'types', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.required': 'Le nom est requis.',
    'name.maxLength': 'Le nom ne doit pas dépasser 75 caractères.',
    'name.minLength': 'Le nom doit contenir au moins 2 caractères.',
    'name.alpha': 'Le nom doit contenir uniquement des lettres.',
    'birth_date.format': 'La date de naissance doit être au format dd-MM-yyyy.',
    'birth_date.before': "La date de naissance doit être avant aujourd'hui.",
    'type_id.required': 'Le type est requis.',
    'type_id.exists': "Le type n'existe pas.",
  }
}

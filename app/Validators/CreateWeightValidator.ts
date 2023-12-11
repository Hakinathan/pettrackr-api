import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWeightValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([rules.required(), rules.unsigned(), rules.range(0, 100)]),
  })

  public messages: CustomMessages = {
    'weight.required': 'Le poids est obligatoire.',
    'weight.unsigned': 'Le poids doit être un nombre positif.',
    'weight.range': 'Le poids doit être compris entre 0 et 100.',
  }
}

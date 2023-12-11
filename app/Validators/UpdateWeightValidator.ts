import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateWeightValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number.optional([rules.unsigned(), rules.range(0, 100)]),
  })

  public messages: CustomMessages = {
    'weight.unsigned': 'Le poids doit être positif.',
    'weight.range': 'Le poids doit être compris entre 0 et 100.',
  }
}

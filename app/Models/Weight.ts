import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pet from 'App/Models/Pet'

export default class Weight extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public weight: number

  @belongsTo(() => Pet)
  public pet: BelongsTo<typeof Pet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

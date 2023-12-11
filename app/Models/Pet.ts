import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Weight from 'App/Models/Weight'
import Type from 'App/Models/Type'

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public birthDate: Date

  @column()
  public typeId: number

  @hasMany(() => Weight)
  public weights: HasMany<typeof Weight>

  @hasOne(() => Type, {
    foreignKey: 'id',
    localKey: 'typeId',
  })
  public type: HasOne<typeof Type>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

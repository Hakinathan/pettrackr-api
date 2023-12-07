import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasMany,
  manyToMany,
  ManyToMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Weight from 'App/Models/Weight'
import Type from 'App/Models/Type'

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public birthDate: Date

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'follow_pets',
  })
  public followers: ManyToMany<typeof User>

  @hasMany(() => Weight)
  public weights: HasMany<typeof Weight>

  @hasOne(() => Type)
  public type: HasOne<typeof Type>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

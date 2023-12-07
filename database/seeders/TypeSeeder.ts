import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from 'App/Models/Type'

export default class extends BaseSeeder {
  public async run() {
    await Type.createMany([
      {
        type: 'chien',
      },
      {
        type: 'chat',
      },
      {
        type: 'oiseau',
      },
      {
        type: 'rongeur',
      },
      {
        type: 'cheval',
      },
      {
        type: 'autre',
      },
    ])
  }
}

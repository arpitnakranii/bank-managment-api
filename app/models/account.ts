import { DateTime } from 'luxon'
import { BaseModel, column} from '@adonisjs/lucid/orm'



export default class Account extends BaseModel {

  

  @column({ isPrimary: true })
  declare id: number


  @column()
  declare user_id :string

  @column()
  declare account_type :string

  @column()
  declare balance: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
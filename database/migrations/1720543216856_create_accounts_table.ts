import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('account_type').notNullable()
      table.string('user_id').notNullable()
      table.bigInteger('balance').notNullable()
      table.timestamps(true,true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
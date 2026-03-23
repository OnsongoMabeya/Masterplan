export const up = async (knex) => {
  await knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.text('domain').notNullable();
    table.text('task_key');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('domain');
    table.index('task_key');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('notes');
};

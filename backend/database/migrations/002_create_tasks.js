export const up = async (knex) => {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.text('task_key').notNullable().unique();
    table.text('domain').notNullable();
    table.text('phase');
    table.text('title').notNullable();
    table.text('detail');
    table.text('tags');
    table.boolean('is_done').defaultTo(false);
    table.timestamp('done_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('domain');
    table.index('is_done');
    table.index(['domain', 'is_done']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('tasks');
};

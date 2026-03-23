export const up = async (knex) => {
  await knex.schema.createTable('progress', (table) => {
    table.increments('id').primary();
    table.text('domain').notNullable().unique();
    table.integer('done_count').defaultTo(0);
    table.integer('total_count').defaultTo(0);
    table.float('percentage').defaultTo(0);
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('progress');
};

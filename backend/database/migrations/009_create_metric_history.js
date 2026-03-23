export const up = async (knex) => {
  await knex.schema.createTable('metric_history', (table) => {
    table.increments('id').primary();
    table.text('metric_key').notNullable();
    table.float('value').notNullable();
    table.text('note');
    table.timestamp('recorded_at').defaultTo(knex.fn.now());
    
    table.index('metric_key');
    table.index('recorded_at');
    table.index(['metric_key', 'recorded_at']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('metric_history');
};

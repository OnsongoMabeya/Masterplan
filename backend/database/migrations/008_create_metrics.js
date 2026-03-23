export const up = async (knex) => {
  await knex.schema.createTable('metrics', (table) => {
    table.increments('id').primary();
    table.text('metric_key').notNullable().unique();
    table.text('category').notNullable();
    table.text('label').notNullable();
    table.text('unit').notNullable();
    table.float('current_value').defaultTo(0);
    table.float('target_value').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('category');
    table.index('metric_key');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('metrics');
};

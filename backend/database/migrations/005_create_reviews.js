export const up = async (knex) => {
  await knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.text('review_type').notNullable();
    table.text('period_label').notNullable();
    table.text('answers').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('review_type');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('reviews');
};

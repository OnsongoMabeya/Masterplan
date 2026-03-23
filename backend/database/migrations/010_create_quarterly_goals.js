export const up = async (knex) => {
  await knex.schema.createTable('quarterly_goals', (table) => {
    table.increments('id').primary();
    table.text('quarter_key').notNullable();
    table.text('domain').notNullable();
    table.text('goal_text').notNullable();
    table.boolean('is_achieved').defaultTo(false);
    table.timestamp('achieved_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('quarter_key');
    table.index('domain');
    table.index(['quarter_key', 'domain']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('quarterly_goals');
};

export const up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.date('plan_start_date').notNullable().defaultTo('2026-03-23');
  });
};

export const down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('plan_start_date');
  });
};

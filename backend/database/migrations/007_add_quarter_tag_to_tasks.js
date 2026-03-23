export const up = async (knex) => {
  await knex.schema.table('tasks', (table) => {
    table.text('quarter_tag').notNullable().defaultTo('Y1-Q1');
    table.index('quarter_tag');
  });
};

export const down = async (knex) => {
  await knex.schema.table('tasks', (table) => {
    table.dropColumn('quarter_tag');
  });
};

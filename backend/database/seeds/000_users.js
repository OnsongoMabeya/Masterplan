import bcrypt from 'bcrypt';

export const seed = async (knex) => {
  await knex('users').del();
  
  // Default PIN: 1234 (user should change on first login)
  const pinHash = await bcrypt.hash('1234', 10);
  
  await knex('users').insert([
    {
      id: 1,
      pin_hash: pinHash
    }
  ]);
};

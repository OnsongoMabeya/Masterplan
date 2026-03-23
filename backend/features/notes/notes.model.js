import db from '../../database/db.js';

export const getAllNotes = async () => {
  return await db('notes').select('*').orderBy('created_at', 'desc');
};

export const getNotesByDomain = async (domain) => {
  return await db('notes').where({ domain }).orderBy('created_at', 'desc');
};

export const getNoteById = async (id) => {
  return await db('notes').where({ id }).first();
};

export const createNote = async (noteData) => {
  const [id] = await db('notes').insert(noteData);
  return await getNoteById(id);
};

export const updateNote = async (id, noteData) => {
  await db('notes').where({ id }).update({
    ...noteData,
    updated_at: db.fn.now()
  });
  return await getNoteById(id);
};

export const deleteNote = async (id) => {
  return await db('notes').where({ id }).del();
};

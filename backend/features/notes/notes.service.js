import * as notesModel from './notes.model.js';

export const getAllNotes = async () => {
  return await notesModel.getAllNotes();
};

export const getNotesByDomain = async (domain) => {
  return await notesModel.getNotesByDomain(domain);
};

export const getNoteById = async (id) => {
  const note = await notesModel.getNoteById(id);
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

export const createNote = async (noteData) => {
  return await notesModel.createNote(noteData);
};

export const updateNote = async (id, noteData) => {
  const existing = await notesModel.getNoteById(id);
  if (!existing) {
    throw new Error('Note not found');
  }
  return await notesModel.updateNote(id, noteData);
};

export const deleteNote = async (id) => {
  const existing = await notesModel.getNoteById(id);
  if (!existing) {
    throw new Error('Note not found');
  }
  return await notesModel.deleteNote(id);
};

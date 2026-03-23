import * as notesService from './notes.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await notesService.getAllNotes();
    sendSuccess(res, notes);
  } catch (error) {
    next(error);
  }
};

export const getNotesByDomain = async (req, res, next) => {
  try {
    const { domain } = req.params;
    const notes = await notesService.getNotesByDomain(domain);
    sendSuccess(res, notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await notesService.getNoteById(parseInt(id));
    sendSuccess(res, note);
  } catch (error) {
    if (error.message === 'Note not found') {
      return sendError(res, 'Note not found', 404);
    }
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const noteData = req.body;
    const note = await notesService.createNote(noteData);
    sendSuccess(res, note, 'Note created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const noteData = req.body;
    const note = await notesService.updateNote(parseInt(id), noteData);
    sendSuccess(res, note, 'Note updated successfully');
  } catch (error) {
    if (error.message === 'Note not found') {
      return sendError(res, 'Note not found', 404);
    }
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    await notesService.deleteNote(parseInt(id));
    sendSuccess(res, null, 'Note deleted successfully');
  } catch (error) {
    if (error.message === 'Note not found') {
      return sendError(res, 'Note not found', 404);
    }
    next(error);
  }
};

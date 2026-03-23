import express from 'express';
import * as notesController from './notes.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', notesController.getAllNotes);
router.get('/domain/:domain', notesController.getNotesByDomain);
router.get('/:id', notesController.getNoteById);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;

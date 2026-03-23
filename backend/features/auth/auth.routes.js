import express from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../shared/middleware/validate.middleware.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';
import { setupPinSchema, loginSchema, changePinSchema } from './auth.schema.js';

const router = express.Router();

router.get('/status', authController.checkStatus);
router.post('/setup', validate(setupPinSchema), authController.setupPin);
router.post('/login', validate(loginSchema), authController.login);
router.post('/change-pin', authenticate, validate(changePinSchema), authController.changePin);
router.get('/verify', authenticate, authController.verifyAuth);

export default router;

import * as authService from './auth.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const setupPin = async (req, res, next) => {
  try {
    const { pin } = req.validatedData;
    
    const userId = await authService.setupPin(pin);
    const token = await authService.login(pin);
    
    sendSuccess(res, { token: token.token, userId }, 'PIN setup successful', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { pin } = req.validatedData;
    
    const result = await authService.login(pin);
    
    sendSuccess(res, result, 'Login successful');
  } catch (error) {
    if (error.message === 'Invalid PIN') {
      return sendError(res, 'Invalid PIN', 401);
    }
    if (error.message.includes('No user found')) {
      return sendError(res, 'No user found. Please set up your PIN first.', 404);
    }
    next(error);
  }
};

export const changePin = async (req, res, next) => {
  try {
    const { currentPin, newPin } = req.validatedData;
    const userId = req.userId;
    
    await authService.changePin(userId, currentPin, newPin);
    
    sendSuccess(res, null, 'PIN changed successfully');
  } catch (error) {
    if (error.message === 'Current PIN is incorrect') {
      return sendError(res, 'Current PIN is incorrect', 401);
    }
    next(error);
  }
};

export const checkStatus = async (req, res, next) => {
  try {
    const status = await authService.checkSetupStatus();
    sendSuccess(res, status);
  } catch (error) {
    next(error);
  }
};

export const verifyAuth = async (req, res) => {
  sendSuccess(res, { userId: req.userId, authenticated: true }, 'Authenticated');
};

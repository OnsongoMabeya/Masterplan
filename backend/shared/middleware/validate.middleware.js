import { sendError } from '../utils/response.utils.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return sendError(res, 'Validation failed', 400);
    }
    
    req.validatedData = result.data;
    next();
  };
};

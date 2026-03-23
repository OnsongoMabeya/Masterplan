import { verifyToken } from '../utils/jwt.utils.js';
import { sendError } from '../utils/response.utils.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'No token provided', 401);
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return sendError(res, 'Invalid or expired token', 401);
  }

  req.userId = decoded.userId;
  next();
};

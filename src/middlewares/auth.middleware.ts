// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const payload = verifyToken(token);
    (req as any).user = payload; // attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

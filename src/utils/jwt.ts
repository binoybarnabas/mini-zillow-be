import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../apimodels/dtos/auth.types';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

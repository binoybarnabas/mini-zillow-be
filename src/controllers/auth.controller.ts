import { Request,Response } from "express";
import { login } from "../services/auth.service";
import { LoginCredential } from "../apimodels/dtos/auth.types";

export const auth = async (_req: Request, res: Response) => {
  try {
    const requestBody : LoginCredential = _req.body;
    
    if (!requestBody.username || !requestBody.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestBody.username)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const data = await login(requestBody);
    res.status(200).json(data);
  } 
  catch (error: any) {
    return res.status(401).json({ message: error.message || 'Authentication failed' });
  }

};
import { Request,Response } from "express";
import { login, registerUser } from "../services/auth.service";
import { LoginCredential } from "../apimodels/dtos/auth.types";
import { validateRegistration } from "../utils/validators";
import { generateToken } from "../utils/jwt";

// User login
export const auth = async (_req: Request, res: Response) => {
  try {
    const requestBody : LoginCredential = _req.body;
    
    if (!requestBody.email || !requestBody.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestBody.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const data = await login(requestBody);
    res.status(200).json(data);
  } 
  catch (error: any) {
    return res.status(401).json({ message: error.message || 'Authentication failed' });
  }
};

// User Registation
export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  const errors = validateRegistration({ name, email, password });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await registerUser(name, email, password);
    const token = generateToken({ userId: user.id});

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
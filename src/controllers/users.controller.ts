import { Request, Response } from 'express';
import * as UserService from '../services/users.service';

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  // example
};

// 👇 export all at once
export {
  getAllUsers,
  getUserById,
};

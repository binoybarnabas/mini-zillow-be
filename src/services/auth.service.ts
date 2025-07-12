import prisma from "../utils/prisma";
import bcrypt from 'bcrypt';
import { LoginCredential } from "../apimodels/dtos/auth.types";
import { generateToken } from "../utils/jwt";

const login = async (credentials: LoginCredential) => {
  const email = credentials.email;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(credentials.password, user.password);
  
    if (!isValidPassword) {
    throw new Error('Invalid email or password');
    }
    
   const token = generateToken({ userId: user.id});

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
  
};

const registerUser = async (name: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  
  if (existing) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email,
      password: hashedPassword
    }
  });

  return user;
};


export { login, registerUser };

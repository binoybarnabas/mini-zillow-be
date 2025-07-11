import prisma from "../utils/prisma";
import bcrypt from 'bcrypt';
import { LoginCredential } from "../apimodels/dtos/auth.types";
import { generateToken } from "../utils/jwt";

const login = async (credentials: LoginCredential) => {
  const email = credentials.username;
  const user = await prisma.user.findUnique({ where: { email } });
  // Validation
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

export { login };

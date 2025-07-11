import prisma from "../utils/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginCredential } from "../apimodels/dtos/auth.types";

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

  // 3. Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  // 4. Return user and token
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

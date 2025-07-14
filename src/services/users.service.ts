import prisma from "../utils/prisma";
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
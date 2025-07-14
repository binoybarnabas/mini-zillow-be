import prisma from "../utils/prisma";// Your Prisma client setup

export const getAllProperties = async () => {
  return await prisma.propertyInfo.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const deleteProperty = async (id: string) => {
  // First delete related images
  await prisma.blob.deleteMany({
    where: { propertyId: id },
  });

  // Then delete the property
  await prisma.propertyInfo.delete({
    where: { id },
  });
};

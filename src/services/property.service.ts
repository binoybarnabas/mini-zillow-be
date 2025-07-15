import prisma from '../utils/prisma';
import cloudinary from '../utils/cloudinary';
import crypto from 'crypto';
import sharp from 'sharp';

export const createProperty = async (
  formData: {
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    realtor: string;
    createdBy: number;
    description: string;
    listingType: number;
  },
  files: Express.Multer.File[] = []
) => {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('At least one image is required');
  }

  // Validate formData fields
  const requiredFields = ['price', 'beds', 'baths', 'sqft', 'address', 'realtor','listingType'];
  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const propertyId = crypto.randomUUID();
  const urls: string[] = [];

  for (const file of files) {
    if (!file.buffer || !file.mimetype.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const compressedBuffer = await sharp(file.buffer)
    .resize({ width: 1280 }) // Resize width (optional)
    .jpeg({ quality: 70 })    // Compress to JPEG with 70% quality
    .toBuffer();
    
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'mini-zillow',
          resource_type: 'image',
          public_id: `${propertyId}-${Date.now()}`,
        },
        (error, result) => {
          if (error || !result) return reject(new Error('Cloudinary upload failed'));
          resolve(result);
        }
      );

      stream.end(compressedBuffer);
    });

    urls.push(result.secure_url);
  }
  formData.listingType = Number(formData.listingType);
  const property = await prisma.propertyInfo.create({
    data: {
      id: propertyId,
      ...formData,
      images: {
        create: urls.map(url => ({ url })),
      }
      },
    include: { images: true },
  });

  return property;
};

export const getAllProperties = async () => {
  return await prisma.propertyInfo.findMany({
    include: {
      images: true, // Fetch related images from Blob table
    },
    orderBy: {
      createdAt: 'desc', // Optional: sort by price or any other field
    },
  });
};

export const getPropertyById = async (id: string) => {
  return await prisma.propertyInfo.findUnique({
    where: { id },
    include: {
      images: true, // Include related images
    },
  });
};

export const updateProperty = async (
  id: string,
  data: {
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    realtor: string;
    description: string;
    listingType: number;
  },
  files: Express.Multer.File[] = []
) => {
  const existing = await prisma.propertyInfo.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!existing) throw new Error('Property not found');

  const urls: string[] = [];

  if (files.length > 0) {
    for (const file of files) {
      if (!file.buffer || !file.mimetype.startsWith('image/')) {
        throw new Error('Invalid file type');
      }

      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 1280 })
        .jpeg({ quality: 70 })
        .toBuffer();

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'mini-zillow',
            resource_type: 'image',
            public_id: `${id}-${Date.now()}`,
          },
          (error, result) => {
            if (error || !result) return reject(new Error('Cloudinary upload failed'));
            resolve(result);
          }
        );
        stream.end(compressedBuffer);
      });

      urls.push(result.secure_url);
    }
  }

  const updated = await prisma.propertyInfo.update({
    where: { id },
    data: {
      ...data,
      images: files.length
        ? {
            deleteMany: {}, 
            create: urls.map((url) => ({ url })), 
          }
        : undefined,
    },
    include: { images: true },
  });

  return updated;
};

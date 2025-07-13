import { Request, Response } from 'express';
import { createProperty, getAllProperties } from '../services/property.service';

export const handleCreateProperty = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] || [];

    const {
      price,
      beds,
      baths,
      sqft,
      address,
      realtor,
      // realtorLogo,
    } = req.body;

    // Basic Validation
    if (!price || !beds || !baths || !sqft || !address || !realtor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate number fields
    const parsedBeds = Number(beds);
    const parsedBaths = Number(baths);
    const parsedSqft = Number(sqft);

    if (isNaN(parsedBeds) || isNaN(parsedBaths) || isNaN(parsedSqft)) {
      return res.status(400).json({ message: 'Beds, baths, and sqft must be numbers' });
    }

    const property = await createProperty(
      {
        price,
        beds: parsedBeds,
        baths: parsedBaths,
        sqft: parsedSqft,
        address,
        realtor,
        // realtorLogo,
      },
      files
    );

    return res.status(201).json({ property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error: (error as Error).message });
  }
};

export const handleGetAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json({ properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch properties', error });
  }
};

import { Request, Response } from 'express';
import { createProperty, getAllProperties, getPropertyById} from '../services/property.service';
import { getUserIdFromToken } from '../utils/jwt';

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
      description,
      listingType
    } = req.body;
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    let userDataDecoded: { userId: number};
    try {
      userDataDecoded = getUserIdFromToken(token); // contains userId
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

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
        createdBy: userDataDecoded.userId,
        description,
        listingType
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

export const handleGetPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch property', error });
  }
};

import { Request, Response } from 'express';
import { getAllProperties, deleteProperty } from '../services/admin.service';

export const handleGetAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

export const handleDeleteProperty = async (req: Request, res: Response) => {
    console.log("request",req);
  try {
    const { id } = req.params;
    await deleteProperty(id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Failed to delete property' });
  }
};

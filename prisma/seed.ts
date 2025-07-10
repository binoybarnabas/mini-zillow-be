import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = crypto.createHash('sha256').update('yourPassword123').digest('hex');
  const user = await prisma.user.create({
      data: 
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: hashedPassword, // You should hash passwords in real apps
      } 
  });

  // 2. Create a property with images
  const property = await prisma.propertyInfo.create({
    data: {
      id: '1',
      price: '$2,550,000',
      beds: 8,
      baths: 9,
      sqft: 4691,
      address: '1061 NW North River Dr, Miami, FL 33136',
      realtor: 'COMPASS FLORIDA, LLC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
      images: {
        create: [
          { url: 'https://source.unsplash.com/random/800x600?house-1' },
          { url: 'https://source.unsplash.com/random/800x600?house-2' },
          { url: 'https://source.unsplash.com/random/800x600?house-3' },
        ],
      },
      
    },
  });

  console.log('✅ Seeded user and property:', user.email);
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

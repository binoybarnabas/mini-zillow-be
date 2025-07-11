import crypto from 'crypto';
import bcrypt from 'bcrypt';
import prisma from '../src/utils/prisma';

async function main() {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('password', saltRounds);
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
      id: '2',
      price: '$550,000',
      beds: 6,
      baths: 10,
      sqft: 5000,
      address: '1061 NW North River Dr, florida, FL 33136',
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

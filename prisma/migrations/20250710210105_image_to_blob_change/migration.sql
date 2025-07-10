/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_propertyId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Blob" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Blob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blob" ADD CONSTRAINT "Blob_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

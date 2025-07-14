/*
  Warnings:

  - You are about to drop the column `userId` on the `PropertyInfo` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `PropertyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PropertyInfo" DROP CONSTRAINT "PropertyInfo_userId_fkey";

-- AlterTable
ALTER TABLE "PropertyInfo" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

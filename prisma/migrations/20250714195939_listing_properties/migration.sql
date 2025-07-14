/*
  Warnings:

  - Added the required column `listingType` to the `PropertyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" ADD COLUMN     "listingType" INTEGER NOT NULL;

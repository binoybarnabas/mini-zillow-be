/*
  Warnings:

  - Added the required column `description` to the `PropertyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" ADD COLUMN     "description" TEXT NOT NULL;

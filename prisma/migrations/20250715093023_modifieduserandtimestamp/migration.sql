-- AlterTable
ALTER TABLE "PropertyInfo" ADD COLUMN     "modifiedAt" TIMESTAMP(3),
ADD COLUMN     "modifiedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);

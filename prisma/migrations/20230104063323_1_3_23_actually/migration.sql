/*
  Warnings:

  - The values [REPAIR,ORDERED] on the enum `AssetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "SalaryUnit" AS ENUM ('HOURLY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ANNUAL', 'CONTRACT');

-- AlterEnum
BEGIN;
CREATE TYPE "AssetStatus_new" AS ENUM ('ASSIGNED', 'AVAILABLE', 'SERVICING', 'RETIRED', 'LOST', 'DONATED', 'RECYCLED');
ALTER TABLE "Asset" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Asset" ALTER COLUMN "status" TYPE "AssetStatus_new" USING ("status"::text::"AssetStatus_new");
ALTER TYPE "AssetStatus" RENAME TO "AssetStatus_old";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
DROP TYPE "AssetStatus_old";
ALTER TABLE "Asset" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "salaryUnit" "SalaryUnit",
ALTER COLUMN "salaryRangeHigh" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "salaryRangeLow" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ChangeInAssetCondition" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetId" TEXT NOT NULL,
    "oldCondition" "ConditionStatus" NOT NULL,
    "newCondition" "ConditionStatus" NOT NULL,
    "assignedToId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "ChangeInAssetCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTicket" (
    "id" TEXT NOT NULL,
    "easyId" SERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "ServiceTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTicket_easyId_key" ON "ServiceTicket"("easyId");

-- AddForeignKey
ALTER TABLE "ChangeInAssetCondition" ADD CONSTRAINT "ChangeInAssetCondition_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeInAssetCondition" ADD CONSTRAINT "ChangeInAssetCondition_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTicket" ADD CONSTRAINT "ServiceTicket_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

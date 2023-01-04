-- DropForeignKey
ALTER TABLE "ChangeInAssetCondition" DROP CONSTRAINT "ChangeInAssetCondition_assignedToId_fkey";

-- AlterTable
ALTER TABLE "ChangeInAssetCondition" ALTER COLUMN "assignedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChangeInAssetCondition" ADD CONSTRAINT "ChangeInAssetCondition_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

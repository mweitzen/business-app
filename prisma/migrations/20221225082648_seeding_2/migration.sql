/*
  Warnings:

  - You are about to drop the column `something` on the `Asset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "condition" TEXT NOT NULL DEFAULT 'new',
    "conditionNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'avaialable',
    CONSTRAINT "Asset_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "AssetPurchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("assignedToId", "brand", "condition", "conditionNotes", "description", "id", "imageUrl", "name", "purchaseId", "serialNumber", "status", "type") SELECT "assignedToId", "brand", "condition", "conditionNotes", "description", "id", "imageUrl", "name", "purchaseId", "serialNumber", "status", "type" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");
CREATE UNIQUE INDEX "Asset_purchaseId_key" ON "Asset"("purchaseId");
CREATE UNIQUE INDEX "Asset_assignedToId_key" ON "Asset"("assignedToId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

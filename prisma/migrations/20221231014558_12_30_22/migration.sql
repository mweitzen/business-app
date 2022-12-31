/*
  Warnings:

  - Added the required column `topReportId` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "topReportId" TEXT NOT NULL,
    CONSTRAINT "Department_topReportId_fkey" FOREIGN KEY ("topReportId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Department" ("code", "id", "name") SELECT "code", "id", "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_topReportId_key" ON "Department"("topReportId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

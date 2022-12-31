/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "personalEmail" TEXT,
    "image" TEXT,
    "name" TEXT,
    "firstName" TEXT,
    "preferredName" TEXT,
    "lastName" TEXT,
    "middleName" TEXT,
    "preferredPronouns" TEXT,
    "managerId" TEXT,
    "positionId" TEXT,
    "organizationId" TEXT,
    "departmentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT,
    "phoneAlt" TEXT,
    CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "departmentId", "email", "firstName", "id", "image", "lastName", "managerId", "middleName", "name", "organizationId", "phone", "phoneAlt", "positionId", "preferredName", "preferredPronouns") SELECT "createdAt", "departmentId", "email", "firstName", "id", "image", "lastName", "managerId", "middleName", "name", "organizationId", "phone", "phoneAlt", "positionId", "preferredName", "preferredPronouns" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_personalEmail_key" ON "User"("personalEmail");
CREATE UNIQUE INDEX "User_positionId_key" ON "User"("positionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

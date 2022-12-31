-- CreateTable
CREATE TABLE "_ApplicantToPosition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ApplicantToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Applicant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ApplicantToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Applicant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "appliedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'UNSEEN',
    "resume" TEXT,
    "coverLetter" TEXT,
    "internalNotes" TEXT,
    "rating" INTEGER,
    "currentEmployee" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Applicant" ("appliedOn", "coverLetter", "email", "id", "internalNotes", "name", "rating", "resume", "status") SELECT "appliedOn", "coverLetter", "email", "id", "internalNotes", "name", "rating", "resume", "status" FROM "Applicant";
DROP TABLE "Applicant";
ALTER TABLE "new_Applicant" RENAME TO "Applicant";
CREATE UNIQUE INDEX "Applicant_email_key" ON "Applicant"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicantToPosition_AB_unique" ON "_ApplicantToPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicantToPosition_B_index" ON "_ApplicantToPosition"("B");

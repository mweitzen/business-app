/*
  Warnings:

  - You are about to drop the column `employeeStatus` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[onboardingProcessId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LaborStatus" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'SEASONAL', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('UNSCHEDULED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'WARNING', 'OVERDUE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('UNSCHEDULED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'WARNING', 'OVERDUE', 'TERMINATED');

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "laborStatus" "LaborStatus",
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "salaryRangeHigh" INTEGER,
ADD COLUMN     "salaryRangeLow" INTEGER,
ADD COLUMN     "supervisingPositionId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employeeStatus",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "laborStatus" "LaborStatus",
ADD COLUMN     "onboardingProcessId" TEXT;

-- DropEnum
DROP TYPE "EmployeeStatus";

-- CreateTable
CREATE TABLE "OnboardingTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "OnboardingTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingProcess" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "employeeStartDate" TIMESTAMP(3) NOT NULL,
    "onboardingBeginDate" TIMESTAMP(3) NOT NULL,
    "status" "OnboardingStatus" NOT NULL,
    "statusNotes" TEXT,
    "paperworkSent" BOOLEAN NOT NULL,
    "paperworkSentDate" TIMESTAMP(3),
    "paperworkReceived" BOOLEAN NOT NULL,
    "paperworkReceivedDate" TIMESTAMP(3),
    "userSetup" BOOLEAN NOT NULL,

    CONSTRAINT "OnboardingProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingTaskTemplate" (
    "id" TEXT NOT NULL,

    CONSTRAINT "OnboardingTaskTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingTask" (
    "id" TEXT NOT NULL,
    "onboardingProcessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "OnboardingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OnboardingTemplateToPosition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OnboardingTaskTemplateToOnboardingTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OnboardingTemplateToPosition_AB_unique" ON "_OnboardingTemplateToPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_OnboardingTemplateToPosition_B_index" ON "_OnboardingTemplateToPosition"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OnboardingTaskTemplateToOnboardingTemplate_AB_unique" ON "_OnboardingTaskTemplateToOnboardingTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_OnboardingTaskTemplateToOnboardingTemplate_B_index" ON "_OnboardingTaskTemplateToOnboardingTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_onboardingProcessId_key" ON "User"("onboardingProcessId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_onboardingProcessId_fkey" FOREIGN KEY ("onboardingProcessId") REFERENCES "OnboardingProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_supervisingPositionId_fkey" FOREIGN KEY ("supervisingPositionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingProcess" ADD CONSTRAINT "OnboardingProcess_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingTask" ADD CONSTRAINT "OnboardingTask_onboardingProcessId_fkey" FOREIGN KEY ("onboardingProcessId") REFERENCES "OnboardingProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingTask" ADD CONSTRAINT "OnboardingTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingTask" ADD CONSTRAINT "OnboardingTask_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingTemplateToPosition" ADD CONSTRAINT "_OnboardingTemplateToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "OnboardingTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingTemplateToPosition" ADD CONSTRAINT "_OnboardingTemplateToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingTaskTemplateToOnboardingTemplate" ADD CONSTRAINT "_OnboardingTaskTemplateToOnboardingTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "OnboardingTaskTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingTaskTemplateToOnboardingTemplate" ADD CONSTRAINT "_OnboardingTaskTemplateToOnboardingTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "OnboardingTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

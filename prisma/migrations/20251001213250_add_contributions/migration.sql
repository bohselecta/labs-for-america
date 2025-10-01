-- AlterTable
ALTER TABLE "Lab" ADD COLUMN "closedAt" DATETIME;
ALTER TABLE "Lab" ADD COLUMN "reportPath" TEXT;

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorEmail" TEXT,
    "status" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contribution_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContributionVote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contributionId" TEXT NOT NULL,
    "voterName" TEXT NOT NULL,
    "voterEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContributionVote_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributionVote_contributionId_voterEmail_key" ON "ContributionVote"("contributionId", "voterEmail");

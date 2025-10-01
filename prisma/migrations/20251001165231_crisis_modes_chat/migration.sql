-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anonId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "lat" REAL,
    "lon" REAL,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ChatMessage_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Org" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryHex" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crisisMode" TEXT NOT NULL DEFAULT 'NORMAL',
    "crisisTitle" TEXT,
    "crisisMsg" TEXT
);
INSERT INTO "new_Org" ("createdAt", "id", "logoUrl", "name", "primaryHex", "slug") SELECT "createdAt", "id", "logoUrl", "name", "primaryHex", "slug" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
CREATE UNIQUE INDEX "Org_slug_key" ON "Org"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

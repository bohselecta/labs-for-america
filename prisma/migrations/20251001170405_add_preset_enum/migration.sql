-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Org" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryHex" TEXT,
    "themeJson" TEXT,
    "preset" TEXT NOT NULL DEFAULT 'CITY',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crisisMode" TEXT NOT NULL DEFAULT 'NORMAL',
    "crisisTitle" TEXT,
    "crisisMsg" TEXT
);
INSERT INTO "new_Org" ("createdAt", "crisisMode", "crisisMsg", "crisisTitle", "id", "logoUrl", "name", "primaryHex", "slug", "themeJson") SELECT "createdAt", "crisisMode", "crisisMsg", "crisisTitle", "id", "logoUrl", "name", "primaryHex", "slug", "themeJson" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
CREATE UNIQUE INDEX "Org_slug_key" ON "Org"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

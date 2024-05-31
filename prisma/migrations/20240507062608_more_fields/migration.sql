/*
  Warnings:

  - You are about to drop the column `deviceId` on the `AdSlot` table. All the data in the column will be lost.
  - Added the required column `adUnit` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adUnit` to the `AdSlot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SlotSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slotId" INTEGER NOT NULL,
    CONSTRAINT "SlotSize_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AdSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "adUnit" TEXT NOT NULL
);
INSERT INTO "new_Page" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE TABLE "new_AdSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "adUnit" TEXT NOT NULL,
    CONSTRAINT "AdSlot_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AdSlot" ("createdAt", "id", "name", "pageId", "updatedAt") SELECT "createdAt", "id", "name", "pageId", "updatedAt" FROM "AdSlot";
DROP TABLE "AdSlot";
ALTER TABLE "new_AdSlot" RENAME TO "AdSlot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

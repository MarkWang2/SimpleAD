/*
  Warnings:

  - Added the required column `value` to the `SlotTargeting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SlotTargeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "slotId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SlotTargeting_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AdSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SlotTargeting" ("createdAt", "id", "name", "slotId", "updatedAt") SELECT "createdAt", "id", "name", "slotId", "updatedAt" FROM "SlotTargeting";
DROP TABLE "SlotTargeting";
ALTER TABLE "new_SlotTargeting" RENAME TO "SlotTargeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `size` to the `SlotSize` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SlotSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL,
    "slotId" INTEGER NOT NULL,
    CONSTRAINT "SlotSize_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AdSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SlotSize" ("id", "slotId") SELECT "id", "slotId" FROM "SlotSize";
DROP TABLE "SlotSize";
ALTER TABLE "new_SlotSize" RENAME TO "SlotSize";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the `SlotSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `sizeMapping` on the `Device` table. All the data in the column will be lost.
  - Added the required column `viewPort` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SlotSize";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SlotSizeMapping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slotId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    CONSTRAINT "SlotSizeMapping_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AdSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SlotSizeMapping_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "viewPort" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Device" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

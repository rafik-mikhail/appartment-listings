/*
  Warnings:

  - You are about to drop the column `capacity` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `name` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitNumber` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "capacity",
DROP COLUMN "size",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "project" TEXT NOT NULL,
ADD COLUMN     "unitNumber" INTEGER NOT NULL;

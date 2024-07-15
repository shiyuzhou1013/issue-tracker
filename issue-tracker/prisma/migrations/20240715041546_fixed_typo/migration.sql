/*
  Warnings:

  - You are about to drop the column `updateAt` on the `issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

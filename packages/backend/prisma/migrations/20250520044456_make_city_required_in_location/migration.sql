/*
  Warnings:

  - Made the column `city` on table `locations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "city" SET NOT NULL;

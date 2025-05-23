/*
  Warnings:

  - Made the column `propertyTitle` on table `properties` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "propertyTitle" SET NOT NULL;

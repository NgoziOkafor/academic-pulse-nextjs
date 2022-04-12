/*
  Warnings:

  - Added the required column `country` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" ADD COLUMN     "country" TEXT NOT NULL;

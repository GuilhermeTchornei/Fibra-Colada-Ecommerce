/*
  Warnings:

  - You are about to drop the column `categoryId` on the `main_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_id]` on the table `main_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `main_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "main_categories" DROP CONSTRAINT "main_categories_categoryId_fkey";

-- AlterTable
ALTER TABLE "main_categories" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "main_categories_category_id_key" ON "main_categories"("category_id");

-- AddForeignKey
ALTER TABLE "main_categories" ADD CONSTRAINT "main_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

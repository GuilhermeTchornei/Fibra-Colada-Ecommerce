/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `products_variations_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `products_variations_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_variations_images" ADD COLUMN     "image" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_variations_images_image_key" ON "products_variations_images"("image");

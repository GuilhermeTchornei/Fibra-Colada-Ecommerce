/*
  Warnings:

  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.
  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(60);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_categories" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "size" VARCHAR(10) NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stamps" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "image" VARCHAR NOT NULL,

    CONSTRAINT "stamps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_variations" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "stamp_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_variations_images" (
    "id" SERIAL NOT NULL,
    "product_variation_id" INTEGER NOT NULL,

    CONSTRAINT "products_variations_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_size_key" ON "sizes"("size");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations" ADD CONSTRAINT "products_variations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations" ADD CONSTRAINT "products_variations_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations" ADD CONSTRAINT "products_variations_stamp_id_fkey" FOREIGN KEY ("stamp_id") REFERENCES "stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations_images" ADD CONSTRAINT "products_variations_images_product_variation_id_fkey" FOREIGN KEY ("product_variation_id") REFERENCES "products_variations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

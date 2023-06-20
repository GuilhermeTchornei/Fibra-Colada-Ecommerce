/*
  Warnings:

  - You are about to drop the column `product_variation_id` on the `cart_products` table. All the data in the column will be lost.
  - You are about to drop the `products_variations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_variations_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_price_id` to the `cart_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_products" DROP CONSTRAINT "cart_products_product_variation_id_fkey";

-- DropForeignKey
ALTER TABLE "products_variations" DROP CONSTRAINT "products_variations_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products_variations" DROP CONSTRAINT "products_variations_size_id_fkey";

-- DropForeignKey
ALTER TABLE "products_variations" DROP CONSTRAINT "products_variations_stamp_id_fkey";

-- DropForeignKey
ALTER TABLE "products_variations_images" DROP CONSTRAINT "products_variations_images_product_variation_id_fkey";

-- AlterTable
ALTER TABLE "cart_products" DROP COLUMN "product_variation_id",
ADD COLUMN     "product_price_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "products_variations";

-- DropTable
DROP TABLE "products_variations_images";

-- CreateTable
CREATE TABLE "stamps_per_products" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "stamp_id" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "stamps_per_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes_per_stamped_product" (
    "id" SERIAL NOT NULL,
    "size_id" INTEGER NOT NULL,
    "stamp_per_product_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "sizes_per_stamped_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_per_product_size" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "size_per_stamped_product_id" INTEGER NOT NULL,

    CONSTRAINT "price_per_product_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stamp_per_product_images" (
    "id" SERIAL NOT NULL,
    "stamp_per_product_id" INTEGER NOT NULL,
    "image" VARCHAR NOT NULL,

    CONSTRAINT "stamp_per_product_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stamps_per_products" ADD CONSTRAINT "stamps_per_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stamps_per_products" ADD CONSTRAINT "stamps_per_products_stamp_id_fkey" FOREIGN KEY ("stamp_id") REFERENCES "stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes_per_stamped_product" ADD CONSTRAINT "sizes_per_stamped_product_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes_per_stamped_product" ADD CONSTRAINT "sizes_per_stamped_product_stamp_per_product_id_fkey" FOREIGN KEY ("stamp_per_product_id") REFERENCES "stamps_per_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_per_product_size" ADD CONSTRAINT "price_per_product_size_size_per_stamped_product_id_fkey" FOREIGN KEY ("size_per_stamped_product_id") REFERENCES "sizes_per_stamped_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stamp_per_product_images" ADD CONSTRAINT "stamp_per_product_images_stamp_per_product_id_fkey" FOREIGN KEY ("stamp_per_product_id") REFERENCES "stamps_per_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_products" ADD CONSTRAINT "cart_products_product_price_id_fkey" FOREIGN KEY ("product_price_id") REFERENCES "price_per_product_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

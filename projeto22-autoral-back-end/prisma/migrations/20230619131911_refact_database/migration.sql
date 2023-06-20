/*
  Warnings:

  - You are about to drop the column `product_price_id` on the `cart_products` table. All the data in the column will be lost.
  - You are about to drop the `price_per_product_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sizes_per_stamped_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stamp_per_product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stamps_per_products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `products_variations_id` to the `cart_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_products" DROP CONSTRAINT "cart_products_product_price_id_fkey";

-- DropForeignKey
ALTER TABLE "sizes_per_stamped_product" DROP CONSTRAINT "sizes_per_stamped_product_price_id_fkey";

-- DropForeignKey
ALTER TABLE "sizes_per_stamped_product" DROP CONSTRAINT "sizes_per_stamped_product_size_id_fkey";

-- DropForeignKey
ALTER TABLE "sizes_per_stamped_product" DROP CONSTRAINT "sizes_per_stamped_product_stamp_per_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stamp_per_product_images" DROP CONSTRAINT "stamp_per_product_images_stamp_per_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stamps_per_products" DROP CONSTRAINT "stamps_per_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stamps_per_products" DROP CONSTRAINT "stamps_per_products_stamp_id_fkey";

-- AlterTable
ALTER TABLE "cart_products" DROP COLUMN "product_price_id",
ADD COLUMN     "products_variations_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "price_per_product_size";

-- DropTable
DROP TABLE "sizes_per_stamped_product";

-- DropTable
DROP TABLE "stamp_per_product_images";

-- DropTable
DROP TABLE "stamps_per_products";

-- CreateTable
CREATE TABLE "products_stamps" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "stamp_id" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_stamps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_variations" (
    "id" SERIAL NOT NULL,
    "size_id" INTEGER NOT NULL,
    "products_stamps_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_images" (
    "id" SERIAL NOT NULL,
    "products_stamps_id" INTEGER NOT NULL,
    "image" VARCHAR NOT NULL,

    CONSTRAINT "products_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_stamps" ADD CONSTRAINT "products_stamps_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_stamps" ADD CONSTRAINT "products_stamps_stamp_id_fkey" FOREIGN KEY ("stamp_id") REFERENCES "stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations" ADD CONSTRAINT "products_variations_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_variations" ADD CONSTRAINT "products_variations_products_stamps_id_fkey" FOREIGN KEY ("products_stamps_id") REFERENCES "products_stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_images" ADD CONSTRAINT "products_images_products_stamps_id_fkey" FOREIGN KEY ("products_stamps_id") REFERENCES "products_stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_products" ADD CONSTRAINT "cart_products_products_variations_id_fkey" FOREIGN KEY ("products_variations_id") REFERENCES "products_variations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `size_per_stamped_product_id` on the `price_per_product_size` table. All the data in the column will be lost.
  - Added the required column `price_id` to the `sizes_per_stamped_product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "price_per_product_size" DROP CONSTRAINT "price_per_product_size_size_per_stamped_product_id_fkey";

-- DropIndex
DROP INDEX "price_per_product_size_size_per_stamped_product_id_key";

-- AlterTable
ALTER TABLE "price_per_product_size" DROP COLUMN "size_per_stamped_product_id";

-- AlterTable
ALTER TABLE "sizes_per_stamped_product" ADD COLUMN     "price_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sizes_per_stamped_product" ADD CONSTRAINT "sizes_per_stamped_product_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "price_per_product_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

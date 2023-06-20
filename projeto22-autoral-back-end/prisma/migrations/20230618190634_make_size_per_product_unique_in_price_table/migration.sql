/*
  Warnings:

  - A unique constraint covering the columns `[size_per_stamped_product_id]` on the table `price_per_product_size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "price_per_product_size_size_per_stamped_product_id_key" ON "price_per_product_size"("size_per_stamped_product_id");

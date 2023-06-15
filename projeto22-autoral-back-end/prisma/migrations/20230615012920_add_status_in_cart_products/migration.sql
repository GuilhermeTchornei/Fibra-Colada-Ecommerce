-- CreateEnum
CREATE TYPE "cart_product_status" AS ENUM ('IN_CART', 'ORDERED', 'FINISHED', 'CANCELLED');

-- AlterTable
ALTER TABLE "cart_products" ADD COLUMN     "status" "cart_product_status" NOT NULL DEFAULT 'IN_CART';

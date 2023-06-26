import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDb() {
    await prisma.users.deleteMany();
    await prisma.products.deleteMany();
    await prisma.products_stamps.deleteMany();
    await prisma.products_variations.deleteMany();
    await prisma.sizes.deleteMany();
    await prisma.stamps.deleteMany();
    await prisma.cart_products.deleteMany();
    await prisma.categories.deleteMany();
}
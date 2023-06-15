import { Prisma, cart_products } from "@prisma/client";

export type CartProductDto = Omit<Prisma.cart_productsUncheckedCreateInput, 'cart_id'>;
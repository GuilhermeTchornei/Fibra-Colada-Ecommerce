import { PrismaService } from "@/config/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CartRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findCartWithProductsByUserId(userId: number) {
        const cart = await this.prisma.carts.findFirst({
            include: {
                cart_products: {
                    include: {
                        products_variations: {
                            select: {
                                price: true,
                                size: true,
                                products_stamps: {
                                    select: {
                                        product: true,
                                        stamp: true,
                                        products_images: true,
                                    },
                                }
                            }
                        },
                    },
                    where: {
                        status: 'IN_CART',
                    },
                },
            },
            where: {
                user_id: userId,
            }
        });

        if (!cart) return null;
        const products = cart.cart_products.map(p => ({
            id: p.products_variations_id,
            quantity: p.quantity,
            price: p.products_variations.price / 100,
            amount: (p.products_variations.price * p.quantity) / 100,
            name: p.products_variations.products_stamps.product.name,
            size: p.products_variations.size.size,
            stamp: p.products_variations.products_stamps.stamp.name,
            image: p.products_variations.products_stamps.products_images[0].image,
        }));

        let totalAmount = products.reduce((acc, { amount }) => acc + amount, 0);

        return {
            id: cart.id,
            products,
            totalAmount,
        };
    }

    async findCartByUser(userId: number) {
        return await this.prisma.carts.findFirst({
            where: {
                user_id: userId
            }
        })
    }

    async findProductVariationInCartByUser(cartId: number, productVariationId: number) {
        return await this.prisma.cart_products.findFirst({
            where: {
                cart_id: cartId,
                products_variations_id: productVariationId,
                status: 'IN_CART',
            }
        })
    }

    async updateQuantity(cartProductId: number, quantity: number) {
        return await this.prisma.cart_products.update({
            data: {
                quantity
            },
            where: {
                id: cartProductId
            }
        });
    }

    async insertProducts(cart_products: Prisma.cart_productsUncheckedCreateInput) {
        return await this.prisma.cart_products.create({
            data: cart_products
        });
    }
}
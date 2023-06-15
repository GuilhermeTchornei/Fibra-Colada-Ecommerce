import { PrismaService } from "@/config/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CartRepository{
    constructor(private readonly prisma: PrismaService) { }

    async findCartWithProductsByUserId(userId: number) {
        const cart = await this.prisma.carts.findFirst({
            include: {
                cart_products: {
                    include: {
                        product_variation: {
                            select: {
                                id: true,
                                price: true,
                                products_variations_images: {
                                    select: {
                                        image: true,
                                    },
                                    take: 1,
                                },
                                size: {
                                    select: {
                                        size: true,
                                    }
                                },
                                stamp: {
                                    select: {
                                        name: true,
                                    }
                                },
                                product: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        },
                    }
                }
            },
            where: {
                user_id: userId,
            }
        });

        if (!cart) return null;

        return {
            id: cart.id,
            products: cart.cart_products.map(p => ({
                id: p.product_variation_id,
                quantity: p.quantity,
                name: p.product_variation.product.name,
                size: p.product_variation.size.size,
                stamp: p.product_variation.stamp.name,
                image: p.product_variation.products_variations_images[0].image,
            }))
        };
    }

    async findCartByUser(userId: number) {
        return await this.prisma.carts.findFirst({
            where: {
                user_id: userId
            }
        })
    }

    async insertProducts(cart_products: Prisma.cart_productsUncheckedCreateInput) {
        return await this.prisma.cart_products.create({
            data: cart_products
        });
    }
}
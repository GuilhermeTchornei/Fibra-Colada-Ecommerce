import { CartProductDto } from "@/interfaces/dto/cart.interface";
import { CartRepository } from "@/repositories/cart.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async getCartById(userId: number) {
        return await this.cartRepository.findCartWithProductsByUserId(userId);
    }

    async upsertProduct(userId: number, productData: CartProductDto) {
        const { id: cart_id } = await this.cartRepository.findCartByUser(userId);
        const productInCart = await this.cartRepository.findProductVariationInCartByUser(cart_id, productData.products_variations_id);
        if (productInCart) productData.quantity += productInCart.quantity;
        const cart_products_data: Prisma.cart_productsUncheckedCreateInput = {
            id: productInCart?.id | 0,
            cart_id,
            products_variations_id: productData.products_variations_id,
            quantity: Math.max(productData.quantity, 1)
        };
        const response = await this.cartRepository.upsertProducts(cart_products_data);
    }

    async updateQuantity(userId: number, productData: CartProductDto) {
        const { id: cart_id } = await this.cartRepository.findCartByUser(userId);
        const productInCart = await this.cartRepository.findProductVariationInCartByUser(cart_id, productData.products_variations_id);
        if (productInCart) await this.cartRepository.updateQuantity(productInCart.id, productData.quantity);
        else throw new NotFoundException();
    }

    async deleteProduct(userId: number, products_variations_id: number) {
        const { id: cart_id } = await this.cartRepository.findCartByUser(userId);
        const productInCart = await this.cartRepository.findProductVariationInCartByUser(cart_id, products_variations_id);
        if (productInCart) await this.cartRepository.deleteProduct(productInCart.id);
        else throw new NotFoundException();
    }
}
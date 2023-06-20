import { CartProductDto } from "@/interfaces/dto/cart.interface";
import { CartRepository } from "@/repositories/cart.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async getCartById(userId: number) {
        return await this.cartRepository.findCartWithProductsByUserId(userId);
    }

    async insertProduct(userId: number, productData: CartProductDto) {
        const { id: cart_id } = await this.cartRepository.findCartByUser(userId);
        const sameVariation = await this.cartRepository.findProductVariationInCartByUser(cart_id, productData.products_variations_id);
        if (sameVariation) await this.cartRepository.updateQuantity(sameVariation.id, productData.quantity || sameVariation.quantity + 1);
        else await this.cartRepository.insertProducts({ ...productData, cart_id })
    }
}
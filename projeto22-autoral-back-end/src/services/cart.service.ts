import { CartRepository } from "@/repositories/cart.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async getCartById(userId: number) {
        return await this.cartRepository.findFirstByUserId(userId);
    }
}
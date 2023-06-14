import UserReq from "@/interfaces/UserRequest.interface";
import { AuthGuard } from "@/middlewares/auth.guard";
import { CartService } from "@/services/cart.service";
import { Controller, Get, Request, UseGuards } from "@nestjs/common";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getCartById(@Request() { userId }: UserReq) {
        await this.cartService.getCartById(userId)
    }
}
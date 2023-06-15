import UserReq from "@/interfaces/UserRequest.interface";
import { CartProductDto } from "@/interfaces/dto/cart.interface";
import { AuthGuard } from "@/middlewares/auth.guard";
import { CartService } from "@/services/cart.service";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from "@nestjs/common";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getCartById(@Request() { userId, body }: UserReq) {
        await this.cartService.getCartById(userId)
    }

    @UseGuards(AuthGuard)
    @Post()
    async insertCartProduct(@Req() { userId }: UserReq, @Body() { product_variation_id }: CartProductDto) {
        product_variation_id = Number(product_variation_id);
        await this.cartService.insertProduct(userId, {product_variation_id});
    }
}
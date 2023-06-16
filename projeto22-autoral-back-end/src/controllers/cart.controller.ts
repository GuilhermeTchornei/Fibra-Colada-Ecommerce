import UserReq from "@/interfaces/UserRequest.interface";
import { CartProductDto } from "@/interfaces/dto/cart.interface";
import { AuthGuard } from "@/middlewares/auth.guard";
import { CartService } from "@/services/cart.service";
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from "@nestjs/common";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getCartById(@Request() { userId }: UserReq) {
        return await this.cartService.getCartById(userId)
    }

    @UseGuards(AuthGuard)
    @Post()
    async insertCartProduct(@Req() { userId }: UserReq, @Body() cartProduct: CartProductDto) {
        try {
            await this.cartService.insertProduct(userId, cartProduct);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }
}
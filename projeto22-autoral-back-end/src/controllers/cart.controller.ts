import UserReq from "@/interfaces/UserRequest.interface";
import { CartProductDeleteDto, CartProductDto } from "@/interfaces/dto/cart.interface";
import { AuthGuard } from "@/middlewares/auth.guard";
import { CartService } from "@/services/cart.service";
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Query, Req, Request, UseGuards } from "@nestjs/common";

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
    async upsertCartProduct(@Req() { userId }: UserReq, @Body() cartProduct: CartProductDto) {
        try {
            await this.cartService.upsertProduct(userId, cartProduct);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    @UseGuards(AuthGuard)
    @Patch('/quantity')
    async updateCartProductQuantity(@Req() { userId }: UserReq, @Body() cartProduct: CartProductDto) {
        try {
            await this.cartService.updateQuantity(userId, cartProduct);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async deleteCartProduct(@Req() { userId }: UserReq, @Query() cartProduct: CartProductDeleteDto) {
        try {
            await this.cartService.deleteProduct(userId, cartProduct.products_variations_id);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }
}
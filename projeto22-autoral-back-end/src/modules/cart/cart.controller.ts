import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, Req, Request, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import CartProductDto from "./dtos/cartProduct.dto";
import DeleteCartProductDto from "./dtos/deleteCartProducts.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import IUserReq from "../auth/interfaces/UserRequest.interface";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getCartById(@Request() { userId }: IUserReq) {
        return await this.cartService.getCartById(userId)
    }

    @UseGuards(AuthGuard)
    @Post()
    async upsertCartProduct(@Req() { userId }: IUserReq, @Body() cartProduct: CartProductDto) {
        try {
            await this.cartService.upsertProduct(userId, cartProduct);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    @UseGuards(AuthGuard)
    @Patch('/quantity')
    async updateCartProductQuantity(@Req() { userId }: IUserReq, @Body() cartProduct: CartProductDto) {
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
    async deleteCartProduct(@Req() { userId }: IUserReq, @Query() cartProduct: DeleteCartProductDto) {
        try {
            await this.cartService.deleteProduct(userId, cartProduct);
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }
}
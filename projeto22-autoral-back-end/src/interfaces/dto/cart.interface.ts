import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

type CartProduct = Omit<Prisma.cart_productsUncheckedCreateInput, 'cart_id' | 'status'>;

export class CartProductDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    product_variation_id: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    quantity: number;
}
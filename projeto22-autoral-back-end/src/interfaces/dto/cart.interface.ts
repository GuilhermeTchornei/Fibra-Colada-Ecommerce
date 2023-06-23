import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

type CartProduct = Omit<Prisma.cart_productsUncheckedCreateInput, 'cart_id' | 'status'>;

export class CartProductDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    products_variations_id: number;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    quantity: number;
}

export class CartProductDeleteDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    products_variations_id: number;
}
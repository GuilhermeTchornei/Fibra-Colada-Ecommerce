import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export default class CartProductDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    products_variations_id: number;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    quantity: number;
}

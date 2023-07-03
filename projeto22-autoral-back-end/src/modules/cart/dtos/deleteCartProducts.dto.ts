import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export default class DeleteCartProductDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    products_variations_id: number;
}
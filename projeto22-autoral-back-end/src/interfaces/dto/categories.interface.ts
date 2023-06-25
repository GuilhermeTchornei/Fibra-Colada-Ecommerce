import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    categoriesIds: number[];

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    stampsIds: number[];

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    sizesIds: number[];
}
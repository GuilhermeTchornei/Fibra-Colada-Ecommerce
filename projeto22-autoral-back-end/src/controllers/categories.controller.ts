import { FilterDto } from "@/interfaces/dto/categories.interface";
import { CategoriesService } from "@/services/categories.service";
import { Controller, Get, Param, Query } from "@nestjs/common";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get('/main')
    async getAllMainCategories() {
        return await this.categoriesService.findAllMainCategories();
    }

    @Get('/:category')
    async getAllProductsByCategory(@Param('category') categoryId: number, @Query() filter: FilterDto) {
        return await this.categoriesService.findAllByCategory(categoryId, filter);
    }

    @Get('/:category/filters')
    async getFiltersOptions(@Param('category') categoryId: number) {
        return await this.categoriesService.findFiltersOptions(categoryId);
    }
}
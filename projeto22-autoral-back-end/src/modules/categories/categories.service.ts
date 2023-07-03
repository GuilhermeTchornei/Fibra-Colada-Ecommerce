import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { FilterDto } from "./dtos/filter.dto";

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) { }

    async findAllMainCategories() {
        return await this.categoriesRepository.findAllMainCategories();
    }

    async findAllByCategory(categoryId: number, filter: FilterDto) {
        // if (!filter.categoriesIds) filter.categoriesIds = [categoryId];
        // else filter.categoriesIds.push(categoryId);
        return await this.categoriesRepository.findAllProductsByCategory(categoryId, filter);
    }

    async findFiltersOptions(categoryId: number) {
        return await this.categoriesRepository.findFiltersOptions(categoryId);
    }
}
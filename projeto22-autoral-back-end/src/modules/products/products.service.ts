import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async FindAll() {
        return await this.productsRepository.FindAll();
    }

    async FindUniqueById(id: number) {
        return await this.productsRepository.FindUnique(id);
    }

    async FindNewProducts() {
        return await this.productsRepository.FindNewProducts();
    }
}
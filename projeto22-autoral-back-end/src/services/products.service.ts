import { ProductsRepository } from "@/repositories/products.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async FindAll() {
        return await this.productsRepository.FindAll();
    }
}
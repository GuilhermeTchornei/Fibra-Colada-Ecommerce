import { Roles } from "@/decorators/roles.decorator";
import { AuthGuard } from "@/middlewares/auth.guard";
import { ProductsService } from "@/services/products.service";
import { Controller, Get, Post, UseGuards } from "@nestjs/common";

@Controller('products')
export class ProductsController{
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Post()
    async createOne() {
        return 'all products';
    }

    @Get()
    async getAll() {
        return await this.productsService.FindAll();
    }
}
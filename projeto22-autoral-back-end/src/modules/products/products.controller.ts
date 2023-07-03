import { BadRequestException, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../auth/decorators/auth.decorator";

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

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const numberId = parseInt(id);
        if (isNaN(numberId)) throw new BadRequestException();
        return await this.productsService.FindUniqueById(numberId);
    }
}
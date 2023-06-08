import { Roles } from "@/decorators/roles.decorator";
import { AuthGuard } from "@/middlewares/auth.guard";
import { Controller, Get, Post, UseGuards } from "@nestjs/common";

@Controller('products')
export class ProductsController{
    @UseGuards(AuthGuard)
    @Roles('admin')
    @Post()
    async createOne() {
        return 'all products';
    }
}
import { ProductsController } from "@/controllers/products.controller";
import { Module } from "@nestjs/common";

@Module({
    controllers: [ProductsController],
})
export class ProductsModule { }
import { ProductsController } from "@/controllers/products.controller";
import { ProductsRepository } from "@/repositories/products.repository";
import { ProductsService } from "@/services/products.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository]
})
export class ProductsModule { }
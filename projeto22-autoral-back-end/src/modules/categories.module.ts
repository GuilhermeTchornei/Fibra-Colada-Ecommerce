import { CategoriesController } from "@/controllers/categories.controller";
import { CategoriesRepository } from "@/repositories/categories.repository";
import { CategoriesService } from "@/services/categories.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule { }
import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { PrismaModule } from "../prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule { }
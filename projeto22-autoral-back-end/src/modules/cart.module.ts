import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { CartService } from "@/services/cart.service";
import { CartRepository } from "@/repositories/cart.repository";
import { CartController } from "@/controllers/cart.controller";

@Module({
    imports: [PrismaModule],
    controllers: [CartController],
    providers: [CartService, CartRepository]
})
export class CartModule { }
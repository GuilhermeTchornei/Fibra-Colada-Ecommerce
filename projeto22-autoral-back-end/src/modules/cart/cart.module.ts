import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";
import { PrismaModule } from "../prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CartController],
    providers: [CartService, CartRepository]
})
export class CartModule { }
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PrismaModule } from "../prisma.module";


@Module({
    imports: [
        PrismaModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule { }
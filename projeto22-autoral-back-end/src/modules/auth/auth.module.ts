import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import configuration from "@/config/configuration";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { PrismaModule } from "../prisma.module";


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: configuration().secret_key,
            signOptions: {expiresIn: '1day'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository]
})
export class AuthModule { }
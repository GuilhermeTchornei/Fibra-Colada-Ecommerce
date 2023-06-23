import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "@/repositories/user.repository";
import { SigninController } from "@/controllers/signin.controller";
import { SigninService } from "@/services/signin.service";
import { JwtModule } from "@nestjs/jwt";
import configuration from "@/config/configuration";


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: configuration().secret_key,
            signOptions: {expiresIn: '1day'},
        }),
    ],
    controllers: [SigninController],
    providers: [SigninService, UserRepository]
})
export class SigninModule { }
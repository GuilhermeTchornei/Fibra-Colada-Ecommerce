import { Module } from "@nestjs/common";
import { SignupService } from "@/services/signup.service";
import { SignupController } from "@/controllers/signup.controller";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "@/repositories/user.repository";


@Module({
    imports: [
        PrismaModule,
    ],
    controllers: [SignupController],
    providers: [SignupService, UserRepository]
})
export class SignupModule { }
import SignupDto from "@/interfaces/dto/signup.interface";
import { JoiValidationPipe } from "@/middlewares/validationPipe.middleware";
import { signupSchema } from "@/schemas/signup.schema";
import { SignupService } from "@/services/signup.service";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";

@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) { }

    @Post()
    @UsePipes(new JoiValidationPipe(signupSchema))
    async Signup(@Body() signupDto: SignupDto) {
        const { confirmPassword, ...user } = signupDto;
        return this.signupService.create(user);
    }
}
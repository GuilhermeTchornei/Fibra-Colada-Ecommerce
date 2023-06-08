import { SigninDto } from "@/interfaces/dto/signin.interface";
import { JoiValidationPipe } from "@/middlewares/validationPipe.middleware";
import { signinSchema } from "@/schemas/signin.schema";
import { SigninService } from "@/services/signin.service";
import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";

@Controller('signin')
export class SigninController {
    constructor(private readonly signinService: SigninService) { }

    @Post()
    @UsePipes(new JoiValidationPipe(signinSchema))
    @HttpCode(HttpStatus.OK)
    async Signup(@Body() user: SigninDto) {
        return this.signinService.findFirst(user);
    }
}
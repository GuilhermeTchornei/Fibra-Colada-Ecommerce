import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import CreateUserDto from "./dtos/createUser.dto";

@Controller('signup')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() signupDto: CreateUserDto) {
        const { confirmPassword, ...user } = signupDto;
        return this.userService.create(user);
    }
}
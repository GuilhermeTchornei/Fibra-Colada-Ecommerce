import { IsNotEmpty, IsString } from "class-validator";
import { Match } from "../decorators/match.decorator";
import { AuthDto } from "@/modules/auth/dtos/auth.dto";

export default class CreateUserDto extends AuthDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Match(CreateUserDto, (s) => s.password)
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
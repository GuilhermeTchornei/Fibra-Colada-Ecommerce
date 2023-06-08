import { SigninError } from "@/errors/signinConflict.error";
import { SigninDto } from "@/interfaces/dto/signin.interface";
import { Payload } from "@/interfaces/payload.interface";
import { UserRepository } from "@/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SigninService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async findFirst(user: SigninDto) {
        const _user = await this.userRepository.findFirst({ email: user.email });
        if (_user === null) throw new SigninError();

        const isMatch = await bcrypt.compare(user.password, _user.password);
        if (!isMatch) throw new SigninError();

        const payload: Payload = { userId: _user.id };

        return {
            token: await this.jwtService.signAsync(payload),
            userName: _user.name
        };
    }
}
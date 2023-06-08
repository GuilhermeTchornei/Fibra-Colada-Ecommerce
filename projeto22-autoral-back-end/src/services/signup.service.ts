import { SignupEmailConflictError } from "@/errors/signupConflict.error";
import { UserRepository } from "@/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService{
    constructor(private readonly signupRepository: UserRepository) { }

    async create(user: Prisma.usersCreateInput): Promise<void> {
        const emailExists = await this.signupRepository.findFirst({ email: user.email });
        if (emailExists !== null) throw new SignupEmailConflictError();
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        await this.signupRepository.create(user);
    }
}
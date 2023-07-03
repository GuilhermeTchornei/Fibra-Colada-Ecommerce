import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository) { }

    async create(user: Prisma.usersCreateInput): Promise<void> {
        const emailExists = await this.userRepository.findFirst({ email: user.email });
        if (emailExists !== null) throw new ConflictException('Email já cadastrado');
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        await this.userRepository.create(user);
    }
}
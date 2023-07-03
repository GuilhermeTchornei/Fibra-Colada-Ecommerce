import { faker } from '@faker-js/faker';
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../dtos/createUser.dto';

const prisma = new PrismaClient();

export function createSignupDto() {
    const pwd = faker.internet.password();
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: pwd,
        confirmPassword: pwd,
        phone: faker.phone.number('###########')
    } as CreateUserDto;
}

export async function createUser(signupInput?: CreateUserDto) {
    if (!signupInput) signupInput = createSignupDto();

    const hashPassword = await bcrypt.hash(signupInput.password, 10);

    return await prisma.users.create({
        data: {
            name: signupInput.name,
            email: signupInput.email,
            password: hashPassword,
            phone: signupInput.phone,
        }
    });
}
import { SigninDto } from '@/interfaces/dto/signin.interface';
import { faker } from '@faker-js/faker';

export function createSigninDto() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    } as SigninDto;
}

import { faker } from '@faker-js/faker';
import { AuthDto } from '../dtos/auth.dto';

export function createSigninDto() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    } as AuthDto;
}

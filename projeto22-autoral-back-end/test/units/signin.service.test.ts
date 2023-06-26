import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "@/repositories/user.repository";
import { PrismaModule } from "@/modules/prisma.module";
import { SigninController } from "@/controllers/signin.controller";
import { SigninService } from "@/services/signin.service";
import { SigninDto } from "@/interfaces/dto/signin.interface";
import { JwtService } from "@nestjs/jwt";
import { createSigninDto } from "../factories/signin.factory";
import { users } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { SigninError } from "@/errors/signinConflict.error";

describe('Signin Service', () => {
    let service: SigninService;
    let repository: UserRepository;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [SigninController],
            providers: [SigninService, UserRepository, JwtService],
        }).compile();

        service = module.get<SigninService>(SigninService);
        repository = module.get<UserRepository>(UserRepository);
        jwt = module.get<JwtService>(JwtService);
    });

    describe('FindFirst', () => {
        it('Should return token and username', async () => {
            const mockUserInput: SigninDto = createSigninDto();
            const result = {
                token: 'token',
                userName: 'username',
            };

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => ({name: result.userName} as users));
            jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
            jest.spyOn(jwt, 'signAsync').mockImplementation(async () => 'token');

            const response = await service.findFirst(mockUserInput);

            expect(repository.findFirst).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalled();
            expect(jwt.signAsync).toHaveBeenCalled();
            expect(response).toEqual(result);
        });

        it('Should return Conflict error if user doesn exists', async () => {
            const mockUserInput: SigninDto = createSigninDto();

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => null);

            expect(service.findFirst(mockUserInput)).rejects.toThrowError(SigninError);
        });

        it('Should return Conflict error if password is wrong', async () => {
            const mockUserInput: SigninDto = createSigninDto();
            const result = {
                token: 'token',
                userName: 'username',
            };

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => ({name: result.userName} as users));
            jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

            expect(service.findFirst(mockUserInput)).rejects.toThrowError(SigninError);
        });
    })
})
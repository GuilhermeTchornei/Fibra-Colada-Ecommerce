import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { ConflictException } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { UserRepository } from "@/user/user.repository";
import { AuthController } from "@/auth/auth.controller";
import { AuthDto } from "@/auth/dtos/auth.dto";
import { createSigninDto } from "./auth.factory";
import { PrismaModule } from "@/modules/prisma.module";

describe('Auth Service', () => {
    let service: AuthService;
    let repository: UserRepository;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [AuthController],
            providers: [AuthService, UserRepository, JwtService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repository = module.get<UserRepository>(UserRepository);
        jwt = module.get<JwtService>(JwtService);
    });

    describe('FindFirst', () => {
        it('Should return token and username', async () => {
            const mockUserInput: AuthDto = createSigninDto();
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
            const mockUserInput: AuthDto = createSigninDto();

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => null);

            expect(service.findFirst(mockUserInput)).rejects.toThrowError(ConflictException);
        });

        it('Should return Conflict error if password is wrong', async () => {
            const mockUserInput: AuthDto = createSigninDto();
            const result = {
                token: 'token',
                userName: 'username',
            };

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => ({name: result.userName} as users));
            jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

            expect(service.findFirst(mockUserInput)).rejects.toThrowError(ConflictException);
        });
    })
})
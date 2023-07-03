import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "@/modules/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "@nestjs/common";
import { createSigninDto } from "./auth.factory";
import { ValidationError, validate, validateOrReject } from "class-validator";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { UserRepository } from "@/modules/user/user.repository";
import { AuthDto } from "../dtos/auth.dto";
import { createSignupDto } from "@/modules/user/test/user.factory";
import { plainToInstance } from "class-transformer";
import { faker } from "@faker-js/faker";

describe('Auth Controller', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [AuthController],
            providers: [AuthService, UserRepository, JwtService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    describe('Post Signin', () => {
        it('Should return token and username', async () => {
            const mockUserInput: AuthDto = createSigninDto();
            const result = {
                token: 'token',
                userName: 'username',
            };

            jest.spyOn(service, 'findFirst').mockImplementation(async () => result);

            const response = await controller.Signin(mockUserInput);

            expect(service.findFirst).toHaveBeenCalled();
            expect(response).toEqual(result);
        });

        it('Should throw if body is empty', async () => {
            const dto = plainToInstance(AuthDto, {});
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });

        it('Should throw if has more properties', async () => {
            const data = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                test: 'test',
            } as AuthDto;

            const dto = plainToInstance(AuthDto, data);
            const errors: ValidationError[] = await validate(dto, { forbidNonWhitelisted: true, whitelist: true });
            expect(errors.length).not.toBe(0);
        });

        it('Should throw if has less properties', async () => {
            const data = {
                email: faker.internet.email(),
            } as AuthDto;

            const dto = plainToInstance(AuthDto, data);
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });

        it('Should throw if some property have the wrong type', async () => {
            const data = {
                email: faker.internet.userName(),
                password: faker.internet.password(),
            } as AuthDto;

            const dto = plainToInstance(AuthDto, data);
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });
    })
})
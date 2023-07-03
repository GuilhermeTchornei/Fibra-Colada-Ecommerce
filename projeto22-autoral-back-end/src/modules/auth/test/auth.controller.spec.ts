import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "@/modules/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "@nestjs/common";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UserRepository } from "@/user/user.repository";
import { AuthDto } from "@/auth/dtos/auth.dto";
import { createSigninDto } from "./auth.factory";
import { createSignupDto } from "@/user/test/user.factory";
import { plainToInstance } from "class-transformer";
import { validate, validateOrReject } from "class-validator";

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

        it('Should return Bad Request if body is empty', async () => {
            jest.spyOn(service, 'findFirst').mockImplementation(async () => null);
            const dto = plainToInstance(AuthDto, {});
            validateOrReject

            console.log(await validate(dto));

            expect(async () => await validate(dto)).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has more properties', async () => {
            const mockUserInput: AuthDto = createSignupDto();
            jest.spyOn(service, 'findFirst').mockImplementation(async () => null);

            expect(() => controller.Signin({...mockUserInput, newProp: ''} as AuthDto)).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has less properties', async () => {
            const mockUserInput: AuthDto = createSignupDto();
            jest.spyOn(service, 'findFirst').mockImplementation(async () => null);

            expect(() => controller.Signin({email: mockUserInput.email} as AuthDto)).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if some property have the wrong type', async () => {
            const mockUserInput: AuthDto = createSignupDto();
            jest.spyOn(service, 'findFirst').mockImplementation(async () => null);

            expect(() => controller.Signin({email: mockUserInput.password, password: mockUserInput.password} as AuthDto)).toThrowError(BadRequestException);
        });

    })
})
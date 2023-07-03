import { Test, TestingModule } from "@nestjs/testing";
import { createSignupDto } from "./user.factory";
import { PrismaModule } from "@/modules/prisma.module";
import { signupSchema } from "@/schemas/signup.schema";
import { BadRequestException } from "@nestjs/common";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { UserRepository } from "../user.repository";
import CreateUserDto from "../dtos/createUser.dto";
import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

describe('Signup Controller', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [UserController],
            providers: [UserService, UserRepository],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    describe('Post Signup', () => {
        it('Should create a user', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();

            jest.spyOn(service, 'create').mockImplementation(jest.fn());

            await controller.create(mockUserInput);

            expect(service.create).toHaveBeenCalled();
        });

        it('Should return Bad Request if body is empty', async () => {
            const dto = plainToInstance(CreateUserDto, {});
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });

        it('Should return Bad Request if has more properties', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const dto = plainToInstance(CreateUserDto, { ...mockUserInput, newProp: 'new' });
            const errors: ValidationError[] = await validate(dto, { forbidNonWhitelisted: true, whitelist: true });
            expect(errors.length).not.toBe(0);
        });

        it('Should return Bad Request if has less properties', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const dto = plainToInstance(CreateUserDto, {
                email: mockUserInput.email, name: mockUserInput.name,
                password: mockUserInput.password, confirmPassword: mockUserInput.confirmPassword
            } as CreateUserDto);
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });

        it('Should return Bad Request if some property have the wrong type', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const dto = plainToInstance(CreateUserDto, { ...mockUserInput, email: 'email' });
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });

        it('Should return Bad Request if passwords are different', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const dto = plainToInstance(CreateUserDto, { ...mockUserInput, confirmPassword: 'password' });
            const errors: ValidationError[] = await validate(dto);
            expect(errors.length).not.toBe(0);
        });
    })
})
import { Test, TestingModule } from "@nestjs/testing";
import { createSignupDto } from "./user.factory";
import { PrismaModule } from "@/modules/prisma.module";
import { JoiValidationPipe } from "@/middlewares/validationPipe.middleware";
import { signupSchema } from "@/schemas/signup.schema";
import { BadRequestException } from "@nestjs/common";
import { UserController } from "@/user/user.controller";
import { UserService } from "@/user/user.service";
import { UserRepository } from "@/user/user.repository";
import CreateUserDto from "@/user/dtos/createUser.dto";

describe('Signup Controller', () => {
    let controller: UserController;
    let service: UserService;
    let pipe: JoiValidationPipe;

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
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(pipe.transform(mockUserInput, { type: "body", })).toMatchObject(mockUserInput);

            jest.spyOn(service, 'create').mockImplementation(jest.fn());

            await controller.create(mockUserInput);

            expect(service.create).toHaveBeenCalled();
        });

        it('Should return Bad Request if body is empty', async () => {
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has more properties', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, newProp: 1}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has less properties', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({email: mockUserInput.email }, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if some property have the wrong type', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, email: mockUserInput.name }, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if passwords are different', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, confirmPassword: mockUserInput.name }, { type: "body", })).toThrowError(BadRequestException);
        });
    })
})
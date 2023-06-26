import { SignupController } from "@/controllers/signup.controller"
import SignupDto from "@/interfaces/dto/signup.interface";
import { SignupService } from "@/services/signup.service";
import { Test, TestingModule } from "@nestjs/testing";
import { createSignupDto } from "../factories/signup.factory";
import { UserRepository } from "@/repositories/user.repository";
import { PrismaModule } from "@/modules/prisma.module";
import { JoiValidationPipe } from "@/middlewares/validationPipe.middleware";
import { signupSchema } from "@/schemas/signup.schema";
import { BadRequestException } from "@nestjs/common";

describe('Signup Controller', () => {
    let controller: SignupController;
    let service: SignupService;
    let pipe: JoiValidationPipe;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [SignupController],
            providers: [SignupService, UserRepository],
        }).compile();

        controller = module.get<SignupController>(SignupController);
        service = module.get<SignupService>(SignupService);
    });

    describe('Post Signup', () => {
        it('Should create a user', async () => {
            const mockUserInput: SignupDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(pipe.transform(mockUserInput, { type: "body", })).toMatchObject(mockUserInput);

            jest.spyOn(service, 'create').mockImplementation(jest.fn());

            await controller.Signup(mockUserInput);

            expect(service.create).toHaveBeenCalled();
        });

        it('Should return Bad Request if body is empty', async () => {
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has more properties', async () => {
            const mockUserInput: SignupDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, newProp: 1}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has less properties', async () => {
            const mockUserInput: SignupDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({email: mockUserInput.email }, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if some property have the wrong type', async () => {
            const mockUserInput: SignupDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, email: mockUserInput.name }, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if passwords are different', async () => {
            const mockUserInput: SignupDto = createSignupDto();
            const schema = signupSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, confirmPassword: mockUserInput.name }, { type: "body", })).toThrowError(BadRequestException);
        });
    })
})
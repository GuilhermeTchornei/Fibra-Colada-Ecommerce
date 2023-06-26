import { Test, TestingModule } from "@nestjs/testing";
import { createSignupDto } from "../factories/signup.factory";
import { UserRepository } from "@/repositories/user.repository";
import { PrismaModule } from "@/modules/prisma.module";
import { JoiValidationPipe } from "@/middlewares/validationPipe.middleware";
import { SigninController } from "@/controllers/signin.controller";
import { SigninService } from "@/services/signin.service";
import { SigninDto } from "@/interfaces/dto/signin.interface";
import { signinSchema } from "@/schemas/signin.schema";
import { JwtService } from "@nestjs/jwt";
import { createSigninDto } from "../factories/signin.factory";
import { BadRequestException } from "@nestjs/common";

describe('Signin Controller', () => {
    let controller: SigninController;
    let service: SigninService;
    let pipe: JoiValidationPipe;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [SigninController],
            providers: [SigninService, UserRepository, JwtService],
        }).compile();

        controller = module.get<SigninController>(SigninController);
        service = module.get<SigninService>(SigninService);
    });

    describe('Post Signin', () => {
        it('Should return token and username', async () => {
            const mockUserInput: SigninDto = createSigninDto();
            const schema = signinSchema;
            pipe = new JoiValidationPipe(schema);
            const result = {
                token: 'token',
                userName: 'username',
            };

            expect(pipe.transform(mockUserInput, { type: "body", })).toMatchObject(mockUserInput);

            jest.spyOn(service, 'findFirst').mockImplementation(async () => result);

            const response = await controller.Signin(mockUserInput);

            expect(service.findFirst).toHaveBeenCalled();
            expect(response).toEqual(result);
        });

        it('Should return Bad Request if body is empty', async () => {
            const schema = signinSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has more properties', async () => {
            const mockUserInput: SigninDto = createSignupDto();
            const schema = signinSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, newProp: 1}, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if has less properties', async () => {
            const mockUserInput: SigninDto = createSignupDto();
            const schema = signinSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({email: mockUserInput.email }, { type: "body", })).toThrowError(BadRequestException);
        });

        it('Should return Bad Request if some property have the wrong type', async () => {
            const mockUserInput: SigninDto = createSignupDto();
            const schema = signinSchema;
            pipe = new JoiValidationPipe(schema);

            expect(() => pipe.transform({...mockUserInput, email: mockUserInput.password }, { type: "body", })).toThrowError(BadRequestException);
        });

    })
})
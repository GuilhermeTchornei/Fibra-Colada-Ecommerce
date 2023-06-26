import { SignupController } from "@/controllers/signup.controller"
import SignupDto from "@/interfaces/dto/signup.interface";
import { SignupService } from "@/services/signup.service";
import { Test, TestingModule } from "@nestjs/testing";
import { createSignupDto } from "../factories/signup.factory";
import { UserRepository } from "@/repositories/user.repository";
import { PrismaModule } from "@/modules/prisma.module";
import * as bcrypt from 'bcrypt';
import { users } from "@prisma/client";
import { SignupEmailConflictError } from "@/errors/signupConflict.error";


describe('Signup service', () => {
    let service: SignupService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [SignupController],
            providers: [SignupService, UserRepository],
        }).compile();

        service = module.get<SignupService>(SignupService);
        repository = module.get<UserRepository>(UserRepository);
    });

    describe('create', () => {
        it('Should create a user', async () => {
            const mockUserInput: SignupDto = createSignupDto();

            jest.spyOn(repository, 'findFirst').mockReturnValue(null);
            jest.spyOn(bcrypt, 'hash').mockImplementation(jest.fn());
            jest.spyOn(repository, 'create').mockImplementation(jest.fn());

            await service.create(mockUserInput);

            expect(repository.findFirst).toHaveBeenCalled();
            expect(repository.create).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalled();
        });

        it('Should return Conflict Error if email already exists', async () => {
            const mockUserInput: SignupDto = createSignupDto();

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => ({ } as users));

            expect(service.create(mockUserInput)).rejects.toThrowError(SignupEmailConflictError);
        });
    })
})
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "@/modules/prisma.module";
import * as bcrypt from 'bcrypt';
import { users } from "@prisma/client";
import { UserService } from "@/user/user.service";
import { UserRepository } from "@/user/user.repository";
import { UserController } from "@/user/user.controller";
import CreateUserDto from "@/user/dtos/createUser.dto";
import { ConflictException } from "@nestjs/common";
import { createSignupDto } from "./user.factory";


describe('Signup service', () => {
    let service: UserService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PrismaModule
            ],
            controllers: [UserController],
            providers: [UserService, UserRepository],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    describe('create', () => {
        it('Should create a user', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();

            jest.spyOn(repository, 'findFirst').mockReturnValue(null);
            jest.spyOn(bcrypt, 'hash').mockImplementation(jest.fn());
            jest.spyOn(repository, 'create').mockImplementation(jest.fn());

            await service.create(mockUserInput);

            expect(repository.findFirst).toHaveBeenCalled();
            expect(repository.create).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalled();
        });

        it('Should return Conflict Error if email already exists', async () => {
            const mockUserInput: CreateUserDto = createSignupDto();

            jest.spyOn(repository, 'findFirst').mockImplementation(async () => ({ } as users));

            expect(service.create(mockUserInput)).rejects.toThrowError(ConflictException);
        });
    })
})
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb } from '../helper';
import { PrismaClient } from '@prisma/client';
import { UserModule } from '@/modules/user/user.module';
import CreateUserDto from '@/modules/user/dtos/createUser.dto';

describe('Signup Route', () => {
    let app: INestApplication;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await cleanDb();
    });

    afterAll(async () => {
        await app.close();
      });


    it('Should return 201 status code and add user to db', async () => {
        const signupInput: CreateUserDto = {
            name: 'guilherme',
            email: 'gui@gui.com',
            password: 'gui',
            confirmPassword: 'gui',
            phone: '47999999999'
        };
        const userCount = await prisma.users.count({});
        const response = await request(app.getHttpServer())
            .post('/signup')
            .send(signupInput);

        const userNewCount = await prisma.users.count({});
        expect(response.statusCode).toEqual(HttpStatus.CREATED);
        expect(userNewCount - userCount).toEqual(1);
    });

    it('Should return conflict error if email already exists', async () => {
        const signupInput: CreateUserDto = {
            name: 'guilherme',
            email: 'gui@gui.com',
            password: 'gui',
            confirmPassword: 'gui',
            phone: '47999999999'
        };

        await prisma.users.create({
            data: {
                name: signupInput.name,
                email: signupInput.email,
                password: signupInput.password,
                phone: signupInput.phone,
            }
        });

        const response = await request(app.getHttpServer())
            .post('/signup')
            .send(signupInput);

        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
    });
})
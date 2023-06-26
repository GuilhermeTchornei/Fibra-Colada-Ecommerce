import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb } from '../helper';
import { SignupModule } from '@/modules/signup.module';
import SignupDto from '@/interfaces/dto/signup.interface';
import { PrismaClient } from '@prisma/client';
import { SigninModule } from '@/modules/signin.module';
import { SigninDto } from '@/interfaces/dto/signin.interface';
import { createSigninDto } from '../factories/signin.factory';
import { createSignupDto, createUser } from '../factories/signup.factory';

describe('Signin Route', () => {
    let app: INestApplication;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [SigninModule],
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


    it('Should return status code 200 and return username and token', async () => {
        const signupInput: SignupDto = createSignupDto();
        const signinInput: SigninDto = {
            email: signupInput.email,
            password: signupInput.password
        };

        await createUser(signupInput);

        const response = await request(app.getHttpServer())
            .post('/signin')
            .send(signinInput);

        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.body).toMatchObject(
            expect.objectContaining({
                token: expect.any(String),
                userName: expect.any(String),
            })
        );
    });

    it('Should return conflict error if user doesnt exists', async () => {
        const signinInput: SigninDto = createSigninDto();

        const response = await request(app.getHttpServer())
            .post('/signin')
            .send(signinInput);

        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
    });

    it('Should return conflict error if password is wrong', async () => {
        const signupInput: SignupDto = createSignupDto();
        const signinInput: SigninDto = {
            email: signupInput.email,
            password: 'password'
        };

        await createUser(signupInput);

        const response = await request(app.getHttpServer())
            .post('/signin')
            .send(signinInput);

        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
    });
})
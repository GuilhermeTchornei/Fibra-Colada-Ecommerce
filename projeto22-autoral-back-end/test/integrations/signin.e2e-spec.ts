import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb } from '../helper';
import { AuthModule } from '@/modules/auth/auth.module';
import CreateUserDto from '@/modules/user/dtos/createUser.dto';
import { createSignupDto, createUser } from '@/modules/user/test/user.factory';
import { AuthDto } from '@/modules/auth/dtos/auth.dto';
import { createSigninDto } from '@/modules/auth/test/auth.factory';

describe('Signin Route', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule],
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
        const signupInput: CreateUserDto = createSignupDto();
        const signinInput: AuthDto = {
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
        const signinInput: AuthDto = createSigninDto();

        const response = await request(app.getHttpServer())
            .post('/signin')
            .send(signinInput);

        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
    });

    it('Should return conflict error if password is wrong', async () => {
        const signupInput: CreateUserDto = createSignupDto();
        const signinInput: AuthDto = {
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
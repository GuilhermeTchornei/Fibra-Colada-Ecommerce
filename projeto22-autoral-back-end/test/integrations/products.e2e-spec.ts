import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb, seedDB } from '../helper';
import { SignupModule } from '@/modules/signup.module';
import SignupDto from '@/interfaces/dto/signup.interface';
import { PrismaClient } from '@prisma/client';
import { SigninModule } from '@/modules/signin.module';
import { SigninDto } from '@/interfaces/dto/signin.interface';
import { createSigninDto } from '../factories/signin.factory';
import { createSignupDto, createUser } from '../factories/signup.factory';
import { ProductsModule } from '@/modules/products.module';
import { ISendProduct } from '@/interfaces/products.interface';
import { AuthGuard } from '@/middlewares/auth.guard';
import { PrismaModule } from '@/modules/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ProductsController } from '@/controllers/products.controller';
import { ProductsService } from '@/services/products.service';
import { ProductsRepository } from '@/repositories/products.repository';

describe('Products Route', () => {
    let app: INestApplication;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [ProductsController],
            providers: [ProductsService, ProductsRepository, JwtService, Reflector]
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await cleanDb();
        await seedDB();
    })

    afterAll(async () => {
        await app.close();
    });


    it('Should return status code 200 and return product data', async () => {
        const product = await prisma.products.findFirst({});

        const response = await request(app.getHttpServer())
            .get(`/products/${product.id}`);

        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            sizes: [expect.any(String)],
            stamps: [
                {
                    name: expect.any(String),
                    image: expect.any(String)
                }
            ],
            productStamp: [
                {
                    id: expect.any(Number),
                    stampName: expect.any(String),
                    stampImage: expect.any(String),
                    images: [expect.any(String)],
                    enabled: expect.any(Boolean),
                    variations: [
                        {
                            id: expect.any(Number),
                            price: expect.any(Number),
                            size: expect.any(String),
                            enabled: expect.any(Boolean)
                        }
                    ]
                }
            ]
        } as ISendProduct)
    });
})
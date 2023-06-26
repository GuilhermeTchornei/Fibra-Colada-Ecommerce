import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb, seedDB } from '../helper';
import { PrismaClient } from '@prisma/client';
import { ISendProduct } from '@/interfaces/products.interface';
import { PrismaModule } from '@/modules/prisma.module';
import { JwtService } from '@nestjs/jwt';
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

    describe('getOne', () => {
        it('Should return status code 200 and return product data', async () => {
            const product = await prisma.products.findFirst({});

            const response = await request(app.getHttpServer())
                .get(`/products/${product.id}`);

            expect(response.statusCode).toEqual(HttpStatus.OK);
            expect(response.body).toEqual<ISendProduct>({
                id: expect.any(Number),
                name: expect.any(String),
                productStamp: expect.arrayContaining([
                    {
                        id: expect.any(Number),
                        images: expect.arrayContaining([expect.any(String)]),
                        stampImage: expect.any(String),
                        stampName: expect.any(String),
                        variations: expect.arrayContaining([
                            {
                                enabled: expect.any(Boolean),
                                id: expect.any(Number),
                                price: expect.any(Number),
                                size: expect.any(String),
                            },
                        ]),
                    },
                ]),
                sizes: expect.arrayContaining([expect.any(String)]),
                stamps: expect.arrayContaining([
                    {
                        name: expect.any(String),
                        image: expect.any(String),
                    },
                ]),
            });
        })
    })
})
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cleanDb, seedDB } from '../helper';
import { PrismaClient } from '@prisma/client';
import { CategoriesModule } from '@/modules/categories.module';
import { ISendFilteredProducts } from '@/interfaces/categories.interface';

describe('Categories Route', () => {
    let app: INestApplication;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CategoriesModule],
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

    describe('getAllMainCategories', () => {
        it('Should return status code 200 and return main categories', async () => {
            const response = await request(app.getHttpServer())
                .get(`/categories/main`);

            expect(response.statusCode).toEqual(HttpStatus.OK);
            expect(response.body).toEqual(
                expect.arrayContaining(
                    [
                        {
                            categories: {
                                id: expect.any(Number),
                                name: expect.any(String),
                            }
                        }
                    ]
                ));
        });
    });

    // describe('getAllProductsByCategory', () => {
    //     it('Should return status code 200 and all products filtered by categoryId', async () => {
    //         const category = await prisma.main_categories.findFirst({});
    //         const response = await request(app.getHttpServer())
    //             .get(`/categories/${category.category_id}`)
    //             .query({ categoriesIds: [], sizesIds: [], stampsIds: [] } as FilterDto);


    //         expect(response.statusCode).toEqual(HttpStatus.OK);
    //         expect(response.body).toEqual<ISendFilteredProducts>(
    //             expect.arrayContaining([
    //                 {
    //                     id: expect.any(Number),
    //                     name: expect.any(String),
    //                     productStampId: expect.any(Number),
    //                     variations: expect.arrayContaining([
    //                         {
    //                             id: expect.any(Number),
    //                             price: expect.any(Number),
    //                             size: {
    //                                 id: expect.any(Number),
    //                                 size: expect.any(String),
    //                             },
    //                             enabled: expect.any(Boolean),
    //                         },
    //                     ]),
    //                     enabled: expect.any(Boolean),
    //                     stamp: {
    //                         id: expect.any(Number),
    //                         name: expect.any(String),
    //                     },
    //                     images: expect.arrayContaining([expect.any(String)]),
    //                     categories: expect.arrayContaining([
    //                         {
    //                             id: expect.any(Number),
    //                             name: expect.any(String),
    //                         },
    //                     ]),
    //                 },
    //             ]))
    //     })
    // })
})
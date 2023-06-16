import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.products.deleteMany();
    await prisma.products_variations.deleteMany();
    await prisma.products_variations_images.deleteMany();
    await prisma.sizes.deleteMany();
    await prisma.stamps.deleteMany();
    await prisma.cart_products.deleteMany();
    await prisma.categories.deleteMany();


    const p = await prisma.sizes.create({
        data: {
            size: 'P'
        },
    });

    const m = await prisma.sizes.create({
        data: {
            size: 'M'
        },
    });

    const g = await prisma.sizes.create({
        data: {
            size: 'G'
        },
    });

    const blackStamp = await prisma.stamps.create({
        data: {
            name: 'Preto',
            image: 'black'
        },
    });

    const greenStamp = await prisma.stamps.create({
        data: {
            name: 'Verde',
            image: 'green'
        },
    });

    const whiteStamp = await prisma.stamps.create({
        data: {
            name: 'Branco',
            image: 'white'
        },
    });

    const legging = await prisma.categories.create({
        data: {
            name: 'Legging'
        },
    });

    const biquinis = await prisma.categories.create({
        data: {
            name: 'Biquinis'
        },
    });

    const shorts = await prisma.categories.create({
        data: {
            name: 'Shorts'
        },
    });

    const LeggingP = await prisma.products.create({
        data: {
            name: 'Legging',
            products_categories: {
                create: {
                    category_id: legging.id
                }
            }
        },
    });

    const biquinisP = await prisma.products.create({
        data: {
            name: 'Biquini',
            products_categories: {
                create: {
                    category_id: biquinis.id
                }
            }
        },
    });

    const shortsP = await prisma.products.create({
        data: {
            name: 'Shorts',
            products_categories: {
                create: {
                    category_id: shorts.id
                }
            }
        },
    });

    await prisma.products_variations.createMany({
        data: [
            {
                price: 9000,
                product_id: LeggingP.id,
                size_id: p.id,
                stamp_id: blackStamp.id,
            },
            {
                price: 9000,
                product_id: LeggingP.id,
                size_id: m.id,
                stamp_id: blackStamp.id,
            },
            {
                price: 9000,
                product_id: LeggingP.id,
                size_id: p.id,
                stamp_id: greenStamp.id,
            },
            {
                price: 9000,
                product_id: LeggingP.id,
                size_id: g.id,
                stamp_id: greenStamp.id,
            },
            {
                price: 9000,
                product_id: LeggingP.id,
                size_id: g.id,
                stamp_id: blackStamp.id,
            },
            {
                price: 8000,
                product_id: biquinisP.id,
                size_id: p.id,
                stamp_id: blackStamp.id,
            },
            {
                price: 8000,
                product_id: biquinisP.id,
                size_id: g.id,
                stamp_id: greenStamp.id,
            },
            {
                price: 9000,
                product_id: shortsP.id,
                size_id: p.id,
                stamp_id: blackStamp.id,
            },
            {
                price: 9000,
                product_id: shortsP.id,
                size_id: g.id,
                stamp_id: greenStamp.id,
            }
        ],
    });

    const variations = await prisma.products_variations.findMany({});

    variations.map(async v => {
        await prisma.products_variations_images.create({
            data: {
                image: '/Products/IMG_4904_jpg.jpg',
                product_variation_id: v.id
            }
        })
    })


    console.log('Seed data created successfully');

    prisma.$disconnect();
}

main().catch(error => {
    console.log(error);
})
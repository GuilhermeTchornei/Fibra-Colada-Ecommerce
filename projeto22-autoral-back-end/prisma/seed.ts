import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.products.deleteMany();

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
        ]
    });

    console.log('Seed data created successfully');

    prisma.$disconnect();
}

main().catch(error => {
    console.log(error);
})
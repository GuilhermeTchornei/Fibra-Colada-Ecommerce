import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.products.deleteMany();
    await prisma.products_stamps.deleteMany();
    await prisma.products_variations.deleteMany();
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
            image: '/Stamp/preto.jpg'
        },
    });

    const blueStamp = await prisma.stamps.create({
        data: {
            name: 'blue',
            image: '/Stamp/azul.jpg'
        }
    })

    const greenStamp = await prisma.stamps.create({
        data: {
            name: 'Verde',
            image: '/Stamp/verde.jpg'
        },
    });

    const whiteStamp = await prisma.stamps.create({
        data: {
            name: 'Branco',
            image: '/Stamp/branco.jpg'
        },
    });

    const pinkStamp = await prisma.stamps.create({
        data: {
            name: 'Rosa',
            image: '/Stamp/pink.jpg'
        },
    });

    const yellowStamp = await prisma.stamps.create({
        data: {
            name: 'Amarelo',
            image: '/Stamp/amarelo.jpg'
        },
    });

    const fuchsiaStamp = await prisma.stamps.create({
        data: {
            name: 'Lilas',
            image: '/Stamp/fuchsia.jpg'
        },
    });
    const redStamp = await prisma.stamps.create({
        data: {
            name: 'Vermelho',
            image: '/Stamp/vermelho.jpg'
        },
    });

    const fitness = await prisma.categories.create({
        data: {
            name: 'Conjuntos Fitness'
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

    const FitnessP = await prisma.products.create({
        data: {
            name: 'Conjunto de Top e Bermuda',
            products_categories: {
                create: {
                    category_id: fitness.id
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

    await prisma.products_stamps.create({
        data: {
            product_id: shortsP.id,
            stamp_id: blueStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Shorts/shorts_azul.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 5000,
                        },
                        {
                            size_id: m.id,
                            price: 5580,
                        },
                        {
                            size_id: g.id,
                            price: 5990,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: shortsP.id,
            stamp_id: blackStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Shorts/shorts_preto.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: m.id,
                            price: 5580,
                        },
                        {
                            size_id: g.id,
                            price: 5990,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: shortsP.id,
            stamp_id: redStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Shorts/shorts_vermelho.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 5000,
                        },
                        {
                            size_id: g.id,
                            price: 5990,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: FitnessP.id,
            stamp_id: blueStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Fitness/academia_azul.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 6090,
                        },
                        {
                            size_id: m.id,
                            price: 6580,
                        },
                        {
                            size_id: g.id,
                            price: 7000,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: FitnessP.id,
            stamp_id: whiteStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Fitness/academia_branco.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 6090,
                        },
                        {
                            size_id: m.id,
                            price: 6480,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: FitnessP.id,
            stamp_id: greenStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Fitness/academia_verde.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 6190,
                        },
                        {
                            size_id: m.id,
                            price: 6680,
                        },
                        {
                            size_id: g.id,
                            price: 7100,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: biquinisP.id,
            stamp_id: yellowStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Biquinis/biquini_amarelo.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 8000,
                        },
                        {
                            size_id: m.id,
                            price: 8350,
                        },
                        {
                            size_id: g.id,
                            price: 8599,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: biquinisP.id,
            stamp_id: blueStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Biquinis/biquini_azul.jpg'
                        },
                        {
                            image: '/Products/Biquinis/biquini_azul2.jpg'
                        },
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 8000,
                        },
                        {
                            size_id: m.id,
                            price: 8350,
                        },
                        {
                            size_id: g.id,
                            price: 8599,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: biquinisP.id,
            stamp_id: whiteStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Biquinis/biquini_branco.jpg'
                        },
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: g.id,
                            price: 8599,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: biquinisP.id,
            stamp_id: fuchsiaStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Biquinis/biquini_lilas.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 8000,
                        },
                        {
                            size_id: m.id,
                            price: 8350,
                        },
                    ]
                }
            }
        }
    });

    await prisma.products_stamps.create({
        data: {
            product_id: biquinisP.id,
            stamp_id: pinkStamp.id,
            products_images: {
                createMany: {
                    data: [
                        {
                            image: '/Products/Biquinis/biquini_rosa.jpg'
                        }
                    ]
                }
            },
            products_variations: {
                createMany: {
                    data: [
                        {
                            size_id: p.id,
                            price: 8200,
                        },
                        {
                            size_id: m.id,
                            price: 8550,
                        },
                        {
                            size_id: g.id,
                            price: 8999,
                        },
                    ]
                }
            }
        }
    });

    console.log('Seed data created successfully');

    prisma.$disconnect();
}

main().catch(error => {
    console.log(error);
})
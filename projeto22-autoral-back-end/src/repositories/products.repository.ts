import { PrismaService } from "@/config/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async FindAll() {
        const products = await this.prisma.products.findMany({
            select: {
                id: true,
                name: true,
                products_stamps: {
                    select: {
                        products_images: true,
                        products_variations: {
                            select: {
                                price: true,
                            },
                            orderBy: {
                                price: 'asc',
                            }
                        },
                    },
                },
            }
        });
        return products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.products_stamps[0].products_variations[0].price,
            image: p.products_stamps[0].products_images[0].image,
        }))
    };

    async findUnique(id: number) {
        const product = await this.prisma.products.findUnique({
            include: {
                products_stamps: {
                    include: {
                        products_images: true,
                        products_variations: {
                            include: {
                                size: true,
                            }
                        },
                        stamp: true,
                    },
                },
            },
            where: {
                id
            }
        });

        let sizes: string[] = [];
        let stamps: { name: string, image: string }[] = [];
        product.products_stamps.forEach((s) => {
            s.products_variations.forEach(v => {
                if (!sizes.includes(v.size.size)) sizes.push(v.size.size);
            })
            if (!stamps.some(stamp => stamp.name === s.stamp.name)) stamps.push({ name: s.stamp.name, image: s.stamp.image });
        });

        return {
            id: product.id,
            name: product.name,
            sizes: sizes,
            stamps: stamps,
            productStamp: product.products_stamps.map(s => ({
                id: s.id,
                stampName: s.stamp.name,
                stampImage: s.stamp.image,
                images: s.products_images.map(i => i.image),
                variations: s.products_variations.map(v => ({
                    id: v.id,
                    size: v.size.size,
                    price: v.price / 100,
                    enabled: v.enabled,
                }))
            }))
        }
    }
}
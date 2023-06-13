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
                products_variations: {
                    select: {
                        price: true,
                    },
                    orderBy: {
                        price: 'asc',
                    },
                    take: 1,
                }
            }
        });
        return products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.products_variations[0].price,
        }))
    };

    async findUnique(id: number) {
        const product = await this.prisma.products.findUnique({
            include: {
                products_variations: {
                    include: {
                        products_variations_images: true,
                        size: true,
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
        product.products_variations.forEach((v) => {
            if (!sizes.includes(v.size.size)) sizes.push(v.size.size);
            if (!stamps.some(s => s.name === v.stamp.name)) stamps.push({ name: v.stamp.name, image: v.stamp.image });
        })

        return {
            id: product.id,
            name: product.name,
            sizes: sizes,
            stamps: stamps,
            variations: product.products_variations.map(p => ({
                id: p.id,
                size: p.size.size,
                stampName: p.stamp.name,
                stampImage: p.stamp.image,
                images: p.products_variations_images,
                enabled: p.enabled
            }))
        }
    }
}
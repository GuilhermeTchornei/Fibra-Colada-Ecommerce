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
}
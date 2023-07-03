import { PrismaService } from "@/config/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, users } from "@prisma/client";

@Injectable()
export class UserRepository{
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.usersCreateInput) {
        await this.prisma.users.create({
            data: {
                ...data,
                carts: {
                    create: [{}]
                }
            }
        });
    }

    async findFirst(where: Prisma.usersWhereInput): Promise<users> {
        return await this.prisma.users.findFirst({ where });
    }
}
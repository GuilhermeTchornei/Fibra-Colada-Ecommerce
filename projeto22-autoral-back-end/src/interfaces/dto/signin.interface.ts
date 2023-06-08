import { Prisma } from "@prisma/client";

export type SigninDto = Pick<Prisma.usersCreateInput, 'email' | 'password'>;
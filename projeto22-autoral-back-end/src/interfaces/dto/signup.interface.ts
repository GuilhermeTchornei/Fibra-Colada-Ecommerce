import { Prisma } from "@prisma/client";

export default interface SignupDto extends Prisma.usersCreateInput {
    confirmPassword: string,
}
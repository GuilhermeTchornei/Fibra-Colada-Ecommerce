import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductsModule } from "./products/products.module";
import { CartModule } from "./cart/cart.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
    imports: [AuthModule, UserModule, ProductsModule, CartModule, CategoriesModule],
    exports: [AuthModule, UserModule, ProductsModule, CartModule, CategoriesModule],
})
export class indexModule { }
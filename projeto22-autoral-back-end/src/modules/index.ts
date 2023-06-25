import { Module } from "@nestjs/common";
import { SignupModule } from "./signup.module";
import { SigninModule } from "./signin.module";
import { ProductsModule } from "./products.module";
import { CartModule } from "./cart.module";
import { CategoriesModule } from "./categories.module";

@Module({
    imports: [SignupModule, SigninModule, ProductsModule, CartModule, CategoriesModule],
    exports: [SignupModule, SigninModule, ProductsModule, CartModule, CategoriesModule],
})
export class indexModule { }
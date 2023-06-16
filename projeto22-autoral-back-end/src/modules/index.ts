import { Module } from "@nestjs/common";
import { SignupModule } from "./signup.module";
import { SigninModule } from "./signin.module";
import { ProductsModule } from "./products.module";
import { CartModule } from "./cart.module";

@Module({
    imports: [SignupModule, SigninModule, ProductsModule, CartModule],
    exports: [SignupModule, SigninModule, ProductsModule, CartModule],
})
export class indexModule { }
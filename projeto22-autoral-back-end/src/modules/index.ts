import { Module } from "@nestjs/common";
import { SignupModule } from "./signup.module";
import { SigninModule } from "./signin.module";
import { ProductsModule } from "./products.module";

@Module({
    imports: [SignupModule, SigninModule, ProductsModule],
    exports: [SignupModule, SigninModule, ProductsModule],
})
export class indexModule { }
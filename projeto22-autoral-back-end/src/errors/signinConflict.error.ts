import { HttpException, HttpStatus } from "@nestjs/common";

export class SigninError extends HttpException {
    constructor() {
        super('Email/senha incorretos', HttpStatus.CONFLICT);
    }
}
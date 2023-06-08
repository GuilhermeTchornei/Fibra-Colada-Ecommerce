import { HttpException, HttpStatus } from "@nestjs/common";

export class SignupEmailConflictError extends HttpException {
    constructor() {
        super('Email já cadastrado', HttpStatus.CONFLICT);
    }
}
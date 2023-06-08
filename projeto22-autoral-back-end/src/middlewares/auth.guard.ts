import { Payload } from "@/interfaces/payload.interface";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();
        let payload: Payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
            request.userId = payload.userId;
        } catch (error) {
            throw new UnauthorizedException();
        }

        const roles = this.reflector.get<string>('roles', context.getHandler());
        if (!roles) return true;

        return roles === payload.roles;
    }

    private extractTokenFromHeader(request: Request): string | undefined{
        const token = request.headers.authorization?.split('Bearer ')[1];
        return token;
    }
}

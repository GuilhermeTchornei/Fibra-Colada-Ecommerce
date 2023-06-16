import { Request } from "express";

export default interface UserReq extends Request{
    userId: number,
}
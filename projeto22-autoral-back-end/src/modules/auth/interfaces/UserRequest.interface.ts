import { Request } from "express";

export default interface IUserReq extends Request{
    userId: number,
}
import { Request, Response } from "express";

export const logReq = async(req: Request, res: Response, next: Function) => {
    next();
}
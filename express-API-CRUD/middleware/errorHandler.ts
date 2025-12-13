import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res:Response, next :NextFunction){
    res.status(404).json({error : "Not valid endPoint, Please contact Adminstrator"});
}

export function errorHandler(req: Request, res:Response, next :NextFunction){
    res.status(500).json({error : "Something went wrong.Please try later"})
}
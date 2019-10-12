import { Request, Response } from "express";
import { NextFunction } from "express";

export class corsMiddleWare {
    static Cors(req:Request, res:Response, next:NextFunction) {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    }
}
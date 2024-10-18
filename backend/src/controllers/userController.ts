import { Request,Response,NextFunction } from "express";

export const signin=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        res.json({message:"Hello TypeScript with Express!"});
}
import { Request,Response,NextFunction } from "express";
import User from "../models/userModel";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error";
export const signup=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    console.log("halo");
    const {username,email,password}=req.body
    const hashedPassword= bcryptjs.hashSync(password,10)
    const newUser=new User({
        username,
        email,
        password:hashedPassword
    })
    try{

        await newUser.save()
    res.status(201).json({message:"User created successfully"})
    }catch(error){
next(error)
    }
    
    
}
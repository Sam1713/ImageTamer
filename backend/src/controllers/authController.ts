import { Request,Response,NextFunction } from "express";
import User from "../models/userModel";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error";
import jwt from 'jsonwebtoken'
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

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const validUser = await User.findOne({ email }).lean();
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));

        const token = jwt.sign({ id: validUser._id, userType: 'user' }, process.env.JWT_SECRET as string, {
            expiresIn: '1m'
        });

        const refreshToken = jwt.sign({ id: validUser._id, userType: 'user' }, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn: '3600m'
        });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 60000 
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10000000// 7 days for refresh token
        });
    const{password:hashedPassword,...rest}=validUser
        res.status(200).json({ message: 'Login successful',rest });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('Cookies before clearing:', req.cookies);
  
      // Clear the access token cookie
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
  
      // Clear the refresh token cookie
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
  
      console.log('Cookies after clearing:', req.cookies); // These should now be undefined or missing
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ message: 'Failed to log out' });
    }
  };
  
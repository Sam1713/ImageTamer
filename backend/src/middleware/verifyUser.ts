import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: 'admin' | 'user'; // Match your roles
            };
        }
    }
}

interface TokenPayload {
    id: string;
    userType: 'admin' | 'user'; 
}

export const verifyUser = (userType: 'user' | 'admin') => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log('Cookies:', req.cookies);

    const access_token = req.cookies.access_token; 
    console.log('Access Token:', access_token);

    if (!access_token) {
        return renewToken(userType)(req, res, next);
    }

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET as string) as TokenPayload;
        console.log('Decoded token:', decoded);

        if (decoded.userType !== userType) {
            return res.status(403).json({ message: 'Access denied. You do not have permission to access this resource.' });
        }

        req.user = { id: decoded.id, role: decoded.userType };
        console.log('User verified:', req.user);
        next(); 
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error('Access token expired:', error);
            return renewToken(userType)(req, res, next);
        }
        
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

// Renew token function
const renewToken = (userType: 'user' | 'admin') => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const refresh_token = req.cookies.refresh_token;
    console.log('r',refresh_token)
    if (!refresh_token) {
        return res.status(401).json({ message: 'Refresh token is missing.' });
    }

    try {
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;

        if (decoded.userType !== userType) {
            return res.status(403).json({ message: 'Access denied. Invalid user type.' });
        }

        const newAccessToken = jwt.sign({ id: decoded.id, userType: decoded.userType }, process.env.JWT_SECRET as string, {
            expiresIn: '3200m' 
        });

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 
        });

        req.cookies.access_token = newAccessToken;

        return verifyUser(userType)(req, res, next);
    } catch (error) {
        console.error('Refresh token verification failed:', error);
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
    }
};

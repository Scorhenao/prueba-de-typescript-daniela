import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token,process.env.SECRET_KEY,(err: any, decoded: any) => {
            if(err) return res.status(500).json({ message: 'Invalid token' });
            req.body.userId = decoded.id;
            next();
        }
    );

}

export default verifyJWT;
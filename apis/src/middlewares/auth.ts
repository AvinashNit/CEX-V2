import type{ Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware( req: Request, res: Response, next: NextFunction)
{
    const authToken = req.headers.authorization?.split(" ")[1];
    if(!authToken)
        return res.status(401).json({message:" No token provided"});
    try{
        const { id } = jwt.verify(authToken, process.env.SECRET as string) as JwtPayload;
        req.id = id;
        next()
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}
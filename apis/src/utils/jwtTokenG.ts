import jwt from "jsonwebtoken";


export function generateToken(id: string)
{
    return jwt.sign({id},process.env.SECRET as string);
}
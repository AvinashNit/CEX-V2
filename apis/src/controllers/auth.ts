import type{ Request , Response , NextFunction } from "express";
import { validate } from "../utils/schemaValidator";
import { signUpSchema } from "../types/zodSchema";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtTokenG";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString })
const client = new PrismaClient( {adapter} );

export async function signUpHandler( req: Request, res: Response ){
    const { email , password } = req.body;
    try{
        const validatedData = validate(signUpSchema, { email, password });
        const hashedpassword = await bcrypt.hash(validatedData.password,10);
        const newUser = await client.user.create({data:{ ...validatedData, password: hashedpassword }});
        return res.status(201).json({message: "User created successfully", id : newUser.id})
    }
    catch(err)
    {
        return res.status(403).json(err);
    }

}



export async function  loginHandler( req: Request , res: Response)
{   
    const { email, password } = req.body;
    try{
        const loginBody = validate(signUpSchema, {email, password});
        const userExist =  await client.user.findUnique({
            where:{
                email
            }
        })
        if(!userExist)
            return res.status(401).json({message : "user not found"});
        const validatePassword = bcrypt.compare(loginBody.password, userExist.password);
        if(!validatePassword)
            return res.status(401).json({message : "Invalid password"});
        const token = generateToken(userExist.id);
        return res.status(200).json({token});
    }
    catch(err)
    {
        return res.status(403).json({message: "Error while login"});
    }
}
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
    user: string | JwtPayload;
}

export default class AuthToken {
    async login(request: Request, response: Response){
        const { email, password } = request.body;

        const user = await prisma.user.findFirst({
            where:{
                email: {
                    equals: email
                }
            }
        });
        if(user?.password === createHash("md5").update(password).digest("hex")){
            const token = jwt.sign({email: user.email, name: user.name}, "BOLABOLA");

            return(response.json(token));
        }else{
            return(response.status(403).json("Invalid email or password"));
        }
    }

    async protectedRoute(request: Request, response: Response, nextFunction: NextFunction){
        const bearerToken = request.headers.authorization;
        if(!bearerToken || bearerToken === ""){
            return(response.status(401).json("Token not provided"));
        }else{
            const [, token] = bearerToken.split(" ");
            try{
                const payload = jwt.verify(token, "BOLABOLA");
                (request as CustomRequest).user = payload;
                return(nextFunction());
            }catch(error){
                return(response.status(401).json("Invalid Token"))
            }
        }
    }
};

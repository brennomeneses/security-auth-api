import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class UsersController {
    async handle(request: Request, response: Response){
        const users = await prisma.user.findMany();

        return(response.json(users));
    }

    async store(request: Request, response: Response){
        const { name, email, password } = request.body;

        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                password: createHash("md5").update(password).digest("hex")
            }
        });   
        
        return(response.json(userCreated));
    }

    async destroy(request: Request, response: Response){
        const { id } = request.params;
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return(response.json(user));
    }
};

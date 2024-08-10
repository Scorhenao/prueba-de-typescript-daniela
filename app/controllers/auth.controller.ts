import { container } from "tsyringe";
import { Request,Response } from 'express';
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserService } from "../services/user.service";
import { handleError } from "../helpers/handleErrors.utility";

config()

export class AuthController{
    static async registerUser(req:Request,res:Response): Promise<void>{
        try {
            const newUser = req.body;
            const userService = container.resolve(UserService);
            const createdUser = await userService.createNewUser(newUser)
            res.status(201).json({status:201,message:createdUser})
        } catch (error) {
            handleError(res, req, error as Error)
        }
    }

    static async loginUser(req:Request,res:Response){
        try {
            const {email, password} = req.body;
            const userService = container.resolve(UserService);
            const user = await userService.checkUserCredentials(email, password);
            if(!user || !user.id || !user.roleId){ 
                return res.status(401).json({
                    status: 401,
                    message: "Invalid credentials"
                });
            }
            const token  = AuthController.generateToken({id: user.id, roleId: user.roleId})
            res.status(200).json({status:200,token});
        } catch (error) {
            handleError(res,req,error as Error)
        }
    }
}
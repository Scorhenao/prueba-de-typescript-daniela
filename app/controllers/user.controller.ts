import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/user.service";
import { handleLayersError } from "../helpers/handleLayersErrors.utility";
import { handleError } from "../helpers/handleErrors.utility";


export class UserController{
    static async getUsers(_:Request, res:Response){
        try {
            const userService = container.resolve(UserService)
            const users = await userService.getUsers()
            return res.status(200).json({status:200,data:users})
        } catch (error) {
            handleError(res,_,error as Error)
        }
    }
}
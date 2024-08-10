import { inject,injectable } from "tsyringe";
import { container } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../models/userModel";
import { handleLayersError } from "../helpers/handleLayersErrors.utility";
import bscrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";


@injectable()
export class UserService{
    constructor(@inject(UserRepository)private userRepository: UserRepository){}

    async getUsers (): Promise<UserModel[] | void>{
        try {
            const users = await this.userRepository.getUsers();
            return users
        } catch (error) {
            handleLayersError('service', error)
        }
    }

    async createNewUser(user:Partial<UserModel>):Promise<UserModel | undefined>{
        try {
            if (!user.password) throw new Error ("Password is required");
            const numberHash: number = 10;
            user.password = await bscrypt.hash(user.password,numberHash); 
            return await this.userRepository.createUser(user);
        } catch (error) {
            handleLayersError('service', error)
        }
    }

    async checkUserCredentials(email:string, password:string): Promise<Partial<UserModel | null | undefined>>{
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) throw new Error('Invalid credentials');
            const passwordMatched = await bscrypt.compare(password,user.password)
            if (user && passwordMatched) return user
        } catch (error) {
            handleLayersError('service', error)
        }
    }

    async generateToken(user:{id:number; roleId:number;}){
        const secret = process.env.JWT_SECRET;
        if(!secret) throw new Error("Please provide a right secret");
        console.log(secret);
        const token = jwt.sign(user, secret, {expiresIn: "2h"});
        return token;
    }
}
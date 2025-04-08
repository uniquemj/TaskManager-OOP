import User from "../models/user.model";
import { IUserInfo } from "../types/auth.type";

export class AuthRepository{
    async getUser(email:string){
        return await User.findOne({email: email})
    }

    async registerUser(userInfo: IUserInfo){
        const result = await User.create(userInfo)
        return result
    }
}
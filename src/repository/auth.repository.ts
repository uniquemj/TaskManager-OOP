import User from "../models/user.model";
import { IUserInfo } from "../types/auth.type";
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export class AuthRepository{
    async getUser(email:string){
        return await User.findOne({email: email})
    }

    async registerUser(userInfo: IUserInfo){
        const result = await User.create(userInfo)
        return result
    }

    async loginUser(email: string){
        const user = await this.getUser(email)
        const token = jwt.sign({_id: user?._id, email: user?.email},JWT_SECRET_KEY as string, {expiresIn: "1d"} )
        return {token, user}
    }  
}
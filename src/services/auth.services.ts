import { AuthRepository } from "../repository/auth.repository"
import { ILogin, IUserInfo } from "../types/auth.type";
import createHttpError from "../utils/httperror.utils";
import bycrypt from 'bcryptjs'

export class AuthServices{
    private readonly authRepository: AuthRepository;

    constructor(){
        this.authRepository = new AuthRepository()
    }

    async registerUser(userInfo:IUserInfo){
        try{
            const {fullname, email, password} = userInfo
            const userExist = await this.authRepository.getUser(email!)
            if(userExist){
                throw createHttpError.BadRequest("User with Email Exist.")
            }

            const hashedPassword = await bycrypt.hash(password!, 10)

            const userDetail = {
                fullname,
                email,
                password: hashedPassword
            }
            
            const result = await this.authRepository.registerUser(userDetail)
            return result
        }catch(error){
            throw error
        }
    }

    async loginUser(userCredentials: ILogin){
        try{
            const {email, password} = userCredentials
            const userExist = await this.authRepository.getUser(email)
            if(!userExist){
                throw createHttpError.NotFound("User with email doesn't exist.")
            }

            const isPasswordMatch = bycrypt.compare(userExist.password, password)
            if(!isPasswordMatch){
                throw createHttpError.BadRequest("Password doesn't match.")
            }

            const result = await this.authRepository.loginUser(email)
            return result
        }catch(error){
            throw error
        }
    }
}
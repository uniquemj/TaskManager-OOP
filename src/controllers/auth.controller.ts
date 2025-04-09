import { Request, Response, Router } from "express";
import { AuthServices } from "../services/auth.services";
import createHttpError from "../utils/httperror.utils";
import validate from "../middlewares/validation.middleware";
import { COOKIE } from "../constants/cookies";
import { registerUserSchema, loginUserSchema } from "../validation/auth.validate";


export class AuthController{
    readonly router: Router;
    private static instance: AuthController
    private readonly authServices: AuthServices

    private constructor(){
        this.router = Router()
        this.authServices = new AuthServices()
    }

    static initController(){
        const instance = new AuthController()
        AuthController.instance = instance
        instance.router.post('/register', validate(registerUserSchema), instance.registerUser)
        instance.router.post('/login', validate(loginUserSchema), instance.loginUser)
        instance.router.post('/logout', instance.logoutUser)
        return instance
    }

    registerUser = async(req: Request, res: Response) =>{
        try{
            const userInfo = req.body
            const result = await this.authServices.registerUser(userInfo)
            res.status(200).send({message: "User Registered Successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    loginUser = async(req: Request, res: Response) =>{
        try{
            const userCredentials = req.body
            const result = await this.authServices.loginUser(userCredentials)
            const token = result.token
            const user = result.user

            res.cookie(
                COOKIE.USER_TOKEN_COOKIE, token,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 24*60*60*1000
                }
            )

            res.status(200).send({message: "User Logged In Successfully.",token: token ,user: user})
        } catch (e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    logoutUser = async(req: Request, res: Response) =>{
        try{
            res.clearCookie('USER_TOKEN_COOKIE')
            res.status(200).send({message: "User Logged out Successfully."})
        }catch(e: any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }
}
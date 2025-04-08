import { Request, Response, Router } from "express";
import { AuthServices } from "../services/auth.services";
import createHttpError from "../utils/httperror.utils";
import validate from "../middlewares/validation.middleware";
import { registerUserSchema } from "../validation/auth.validate";

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
}
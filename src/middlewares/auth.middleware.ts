import { Response, NextFunction } from "express";
import { IAuthRequest } from "../types/auth.type";
import createHttpError from "../utils/httperror.utils";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export const verifytoken = (req: IAuthRequest, res: Response, next: NextFunction) =>{
    try{
        const {USER_TOKEN_COOKIE} = req.cookies
        if(!USER_TOKEN_COOKIE){
            throw createHttpError.UnAuthorized("No token provided. Authorization denied.")
        }
        try{
            const decode = jwt.verify(USER_TOKEN_COOKIE, JWT_SECRET_KEY) as JwtPayload
            req.user = {
                _id: decode._id,
                email: decode.email
            }
            next()
        }catch(error){
            throw error
        }
    }catch(e: any){
        throw createHttpError.Custom(e.statusCode, e.message, e.errors)
    }
}
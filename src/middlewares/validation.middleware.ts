import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import createHttpError from "../utils/httperror.utils";


const validate = (schema: ZodSchema) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        try{
            const validation = schema.safeParse(req.body)
            if(!validation.success){
                console.log(validation.error.issues)
                const formattedError = validation.error.issues.map((issue)=>`${issue.path}: ${issue.message}`)
                throw createHttpError.BadRequest("Validation Error",formattedError)
            }
            req.body = validation.data
            next()
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }
}

export default validate
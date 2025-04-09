import { Request } from "express"

export interface IUserInfo{
    _id?:string,
    fullname: string,
    email: string,
    password: string
}

export interface ILogin{
    email: string,
    password: string
}

export interface IAuthRequest extends Request{
    user?: Omit<IUserInfo, 'fullname'| 'password'>
}
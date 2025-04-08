class HttpError extends Error{
    constructor(public statusCode: number, public message: string, public errors:any){
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        Object.setPrototypeOf(this, HttpError.prototype)
    }
}

const createHttpError = {
    BadRequest : (message: string = 'Bad Request', errors?:any) =>{
        return new HttpError(400, message, errors)
    },
    UnAuthorized: (message: string = 'UnAuthorized', errors?:any) =>{
        return new HttpError(401, message, errors)
    },
    Forbidden: (message: string = 'Forbidden', errors?:any) =>{
        return new HttpError(403, message, errors)
    },
    NotFound: (message: string = 'Not Found', errors?:any) =>{
        return new HttpError(404, message, errors)
    },
    InternalServerError: (message: string = 'Internal Server Error', errors?:any) =>{
        return new HttpError(500, message, errors)
    },
    Custom: (statusCode: number, message: string, errors?:any)=>{
        return new HttpError(statusCode, message, errors)
    }
}

export default createHttpError
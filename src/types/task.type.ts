import { Status } from "../models/task.model";

export interface ITask{
    _id?:string,
    title?:string,
    description?: string,
    status?: Status,
    created_at?:Date,
    due_date?:Date
}
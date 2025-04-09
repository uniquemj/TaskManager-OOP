import { Request, Response, Router } from "express";
import TaskService from "../services/task.services";
import createHttpError from "../utils/httperror.utils";
import validate from "../middlewares/validation.middleware";
import {taskSchema, updateTaskSchema} from "../validation/task.validate";
import { verifytoken } from "../middlewares/auth.middleware";
import { IAuthRequest } from "../types/auth.type";

export class TaskController{
    readonly router: Router;
    private static instance: TaskController;
    private readonly taskService: TaskService;

    private constructor(){
        this.router = Router()
        this.taskService = new TaskService()
    }

    static initController(){
        const instance = new TaskController();
        TaskController.instance = instance;
        instance.router.get('/' , verifytoken, instance.getAllTask);
        instance.router.post('/', verifytoken, validate(taskSchema), instance.createTask)
        instance.router.get('/:id', verifytoken, instance.getTaskById)
        instance.router.put('/:id', verifytoken, validate(updateTaskSchema),instance.updateTask)
        instance.router.delete('/:id', verifytoken, instance.removeTask)
        return instance
    }

    getAllTask = async(req: IAuthRequest, res: Response) =>{
        try{
            const _id = req.user!._id!
            const result = await this.taskService.getAllTasks(_id)
            res.status(200).send({message: "Task fetched successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    getTaskById = async(req: IAuthRequest, res: Response) =>{
        try{
            const taskId = req.params.id
            const userId = req.user!._id!
            const result = await this.taskService.getTaskById(taskId, userId)
            res.status(200).send({message: "Task fetched successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    createTask = async(req: IAuthRequest, res: Response) =>{
        try{
            const task = req.body
            const userId = req.user!._id!
            const result = await this.taskService.createTask(task, userId)
            res.status(201).send({message: "Task Created Successfully.", response: result})
        }catch(e: any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    updateTask = async(req: IAuthRequest, res: Response) =>{
        try{
            const taskId = req.params.id
            const userId = req.user!._id!
            const updateTaskInfo = req.body
            const result = await this.taskService.updateTask(taskId, userId, updateTaskInfo)
            res.status(200).send({message: "Task Updated Successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    removeTask = async(req: IAuthRequest, res: Response) =>{
        try{
            const taskId = req.params.id
            const userId = req.user!._id!
            const result = await this.taskService.removeTask(taskId, userId)
            res.status(200).send({message: "Task Removed", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }
}
import { Request, Response, Router } from "express";
import TaskService from "../services/task.services";
import createHttpError from "../utils/httperror.utils";
import validate from "../middlewares/validation.middleware";
import {taskSchema, updateTaskSchema} from "../validation/task.validate";

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
        instance.router.get('/' , instance.getAllTask);
        instance.router.post('/', validate(taskSchema), instance.createTask)
        instance.router.get('/:id', instance.getTaskById)
        instance.router.put('/:id', validate(updateTaskSchema),instance.updateTask)
        instance.router.delete('/:id', instance.removeTask)
        return instance
    }

    getAllTask = async(req: Request, res: Response) =>{
        try{
            const result = await this.taskService.getAllTasks()
            res.status(200).send({message: "Task fetched successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    getTaskById = async(req: Request, res: Response) =>{
        try{
            const {id} = req.params
            const result = await this.taskService.getTaskById(id)
            res.status(200).send({message: "Task fetched successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    createTask = async(req: Request, res: Response) =>{
        try{
            const task = req.body
            const result = await this.taskService.createTask(task)
            res.status(201).send({message: "Task Created Successfully.", response: result})
        }catch(e: any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    updateTask = async(req: Request, res: Response) =>{
        try{
            const {id} = req.params
            const updateTaskInfo = req.body
            const result = await this.taskService.updateTask(id, updateTaskInfo)
            res.status(200).send({message: "Task Updated Successfully.", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }

    removeTask = async(req: Request, res: Response) =>{
        try{
            const {id} = req.params
            const result = await this.taskService.removeTask(id)
            res.status(200).send({message: "Task Removed", response: result})
        }catch(e:any){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }
}
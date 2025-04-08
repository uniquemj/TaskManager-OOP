import Task from "../models/task.model";
import { ITask } from "../types/task.type";
import { TaskRepository } from "../repository/task.repository";
import createHttpError from "../utils/httperror.utils";

class TaskService{
    private readonly taskRepository: TaskRepository

    constructor(){
        this.taskRepository = new TaskRepository()
    }

    async getAllTasks(){
        try{
            const result =  await this.taskRepository.getAllTask()
            if(result.length == 0){
                throw createHttpError.NotFound("Task list is empty.")
            }
            return result
        }catch(error){
            throw error
        }
    }
    async getTaskById(taskId: string){
        try{
            const result = await this.taskRepository.getTaskById(taskId)
            if(!result){
                throw createHttpError.NotFound("Task with Id not found.")
            }
            return result
        }catch(error){
            throw error
        }
    }
    async createTask(task: ITask){
        try{

            const taskInfo = {
                title: task.title,
                description: task.description ?? "",
                status: task.status,
                due_date: task.due_date
            }
            const result = await this.taskRepository.createTask(taskInfo)
            return result
        } catch(error){
            throw error
        }
    }   

    async updateTask(taskId: string, task: ITask){
        try{
            const taskExist = await this.taskRepository.getTaskById(taskId)
            if(!taskExist){
                throw createHttpError.NotFound("Task with Id not found.")
            }
            const result = await this.taskRepository.updateTask(taskId, task)
            return result
        }catch(error){
            throw error
        }
    }

    async removeTask(taskId: string){
        try{
            const taskExist = await this.taskRepository.getTaskById(taskId)
            if(!taskExist){
                throw createHttpError.NotFound("Task with id not found.")
            }
            const result = await this.taskRepository.removeTask(taskId)
            return result
        }catch(error){
            throw error
        }
    }
}

export default TaskService
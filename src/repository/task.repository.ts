import Task from "../models/task.model";
import { ITask } from "../types/task.type";


export class TaskRepository{
    async getAllTask(){
        try{
            return await Task.find()
        }catch(error){
            throw error
        }
    }

    async getTaskById(id: string){
        try{
            return await Task.findById(id)
        }catch(error){
            throw error
        }
    }

    async createTask(task: ITask){
        try{    
            const result = await Task.create(task)
            return result
        }catch(error){
            throw error
        }
    }

    async updateTask(taskId: string, task: ITask){
        try{
            const result = await Task.findByIdAndUpdate(taskId, task, {new: true})
            return result
        }catch(error){
            throw error
        }
    }

    async removeTask(taskId: string){
        try{
            const result = await Task.findByIdAndDelete(taskId)
            return result
        }catch(error){
            throw error
        }
    }
}
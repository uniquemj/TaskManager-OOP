import Task from "../models/task.model";
import { IUserInfo } from "../types/auth.type";
import { ITask } from "../types/task.type";


export class TaskRepository{
    async getAllTask(userId: string){
        try{
            const query = {
                'added_by': userId
            }
            return await Task.find(query).populate('added_by','fullname -_id')
        }catch(error){
            throw error
        }
    }

    async getTaskById(taskId: string, userId: string){
        try{
            const query = {
                "_id":taskId,
                "added_by": userId
            }    
            return await Task.findOne(query).populate('added_by', 'fullname -_id')
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
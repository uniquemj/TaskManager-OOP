import { Schema, Document, Model, model } from "mongoose";

export enum Status{
    IMP="imp",
    NotIMP = "not imp"
}

interface TaskDocument extends Document{
    title: string,
    description: string,
    status: Status,
    created_at: Date,
    due_date: Date,
    added_by: Schema.Types.ObjectId
}

const taskSchema: Schema<TaskDocument> = new Schema({
    added_by:{type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String},
    description: {type: String, maxlength: 150},
    status: {type: String, enum: Status, default: Status.NotIMP},
    created_at: {type: Date, default: Date.now},
    due_date: {type: Date}
})

const Task: Model<TaskDocument> = model('task', taskSchema)

export default Task
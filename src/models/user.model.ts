import { Schema, Document, Model, model } from "mongoose";


interface UserDocument extends Document{
    fullname: string,
    email: string,
    password: string
}

const userSchema: Schema<UserDocument> = new Schema({
    fullname: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true}
})

const User: Model<UserDocument> = model("user", userSchema)

export default User
import express, { urlencoded } from 'express'
import 'dotenv/config'
import apiRouter from './routes/index'
import mongoose from 'mongoose'
import errorHandler from './middlewares/errorhandler.middleware'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended: true}))

app.use('/api', apiRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/playground'
app.listen(PORT, async()=>{
    console.log(`Server listenin at: ${PORT}`)
    try{
        await mongoose.connect(MONGODB_URL)
        console.log("Connected to Database . . .")
    } catch(e){
        console.log("Error: Datebase Connection failed . . .")
    }
})
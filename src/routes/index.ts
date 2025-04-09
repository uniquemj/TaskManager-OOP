import express from 'express'
import { TaskController } from '../controllers/task.controller'
import { AuthController } from '../controllers/auth.controller'

const router = express.Router()

const taskController = TaskController.initController()
const authController = AuthController.initController()

router.use('/tasks', taskController.router)

router.use('/auth', authController.router)

export default router
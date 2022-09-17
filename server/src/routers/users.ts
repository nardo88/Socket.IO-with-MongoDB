import { Router } from 'express'
import controller from '../controllers/usersController'

const userRouter = Router()

userRouter.post('/', controller.addUser)

export default userRouter

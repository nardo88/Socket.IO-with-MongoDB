import { Router } from 'express'
import controller from '../controllers/usersController'

const userRouter = Router()

userRouter.get('/:id', controller.getUser)
userRouter.put('/:id', controller.updateUser)
userRouter.post('/', controller.addUser)

export default userRouter

import { Router } from 'express'
import controller from '../controllers/usersController'
import authMiddleware from '../maddleware/validateToken'

const userRouter = Router()

userRouter.get('/:id', controller.getUser)
userRouter.put('/:id', controller.updateUser)
userRouter.post('/signup', controller.registration)
userRouter.post('/signin', controller.login)

export default userRouter

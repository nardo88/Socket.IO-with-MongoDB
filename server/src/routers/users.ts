import { Router } from 'express'
import controller from '../controllers/usersController'
import authMiddleware from '../maddleware/validateToken'
import { check } from 'express-validator'

const userRouter = Router()

userRouter.get('/:id', controller.getUser)
userRouter.put('/:id', controller.updateUser)
userRouter.post(
  '/signup',
  [check('email', 'Email is not correct').isEmail()],
  controller.registration
)
userRouter.post(
  '/signin',
  [check('email', 'Email is not correct').isEmail()],
  controller.login
)

export default userRouter

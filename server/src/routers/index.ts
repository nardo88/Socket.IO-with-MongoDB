import { Router } from 'express'
import UserController from '../controllers/usersController'
import DialogController from '../controllers/dialogController'
import MessageController from '../controllers/messageController'
import authMiddleware from '../maddleware/validateToken'
import { check } from 'express-validator'

const createRouters = (io: any) => {
  const userController = new UserController(io)
  const dialogController = new DialogController(io)
  const messageController = new MessageController(io)

  const userRouter = Router()
  userRouter.get('/me', authMiddleware, userController.getMe)
  userRouter.get('/:id', userController.getUser)
  userRouter.put('/:id', userController.updateUser)
  userRouter.post(
    '/signup',
    [check('email', 'Email is not correct').isEmail()],
    userController.registration
  )
  userRouter.post(
    '/signin',
    [check('email', 'Email is not correct').isEmail()],
    userController.login
  )

  const dialogRouter = Router()

  // @ts-ignore
  dialogRouter.post('/', authMiddleware, dialogController.add)
  // @ts-ignore
  dialogRouter.get('/', authMiddleware, dialogController.getList)
  dialogRouter.delete('/:id', dialogController.removeDialog)

  const messageRouter = Router()

  messageRouter.post('/', authMiddleware, messageController.add)
  messageRouter.get('/:dialogId', messageController.getList)
  messageRouter.delete('/:id', messageController.removeMessage)

  return {
    userRouter,
    dialogRouter,
    messageRouter,
  }
}

export default createRouters

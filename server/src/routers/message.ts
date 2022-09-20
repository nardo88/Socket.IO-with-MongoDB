import { Router } from 'express'
import controller from '../controllers/messageController'

const messageRouter = Router()

messageRouter.post('/', controller.add)
messageRouter.get('/:dialogId', controller.getList)
messageRouter.delete('/:id', controller.removeMessage)

export default messageRouter

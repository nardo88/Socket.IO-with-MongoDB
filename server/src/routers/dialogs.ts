import { Router } from 'express'
import controller from '../controllers/dialogController'
import authMiddleware from '../maddleware/validateToken'

const dialogRouter = Router()

// @ts-ignore
dialogRouter.post('/', authMiddleware, controller.add)
// @ts-ignore
dialogRouter.get('/', authMiddleware, controller.getList)
dialogRouter.delete('/:id', controller.removeDialog)

export default dialogRouter

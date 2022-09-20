import { Router } from 'express'
import controller from '../controllers/dialogController'

const dialogRouter = Router()

dialogRouter.post('/', controller.add)
dialogRouter.get('/:authotId', controller.getList)
dialogRouter.delete('/:id', controller.removeDialog)

export default dialogRouter

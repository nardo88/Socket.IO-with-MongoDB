import { Request, Response } from 'express'
import Dialogs from '../models/Dialogs'

interface IRequest extends Request {
  user: {
    id: string
  }
}

class DialogController {
  async add(req: IRequest, res: Response) {
    // При создании диалога нужно создавать первое сообщение
    try {
      const { partner } = req.body
      const dialog = await new Dialogs({
        author: req.user.id,
        partner,
      })

      await dialog.save()
      res.json(dialog)
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async getList(req: IRequest, res: Response) {
    try {
      Dialogs.find({ author: req.user.id })
        .populate(['author', 'partner'])
        .exec((err: any, dialog: any) => {
          if (err) {
            return res.status(404).json('Dialog not found')
          }
          return res.json(dialog)
        })
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async removeDialog(req: Request, res: Response) {
    try {
      const { id } = req.params
      await Dialogs.findByIdAndDelete(id)
      res.json('success')
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new DialogController()

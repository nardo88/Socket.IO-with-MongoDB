import { Request, Response } from 'express'
import Dialogs from '../models/Dialogs'

class DialogController {
  async add(req: Request, res: Response) {
    // При создании диалога нужно создавать первое сообщение
    try {
      const { author, partner } = req.body
      const dialog = await new Dialogs({
        author,
        partner,
      })

      await dialog.save()
      res.json(dialog)
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async getList(req: Request, res: Response) {
    try {
      const { authotId } = req.params

      Dialogs.find({ author: authotId })
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

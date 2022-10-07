import { Request, Response } from 'express'
import Dialogs from '../models/Dialogs'
import socket from 'socket.io'

interface IRequest extends Request {
  user: {
    id: string
  }
}

class DialogController {
  io: socket.Server
  constructor(io: socket.Server) {
    this.io = io
  }

  async add(req: IRequest, res: Response) {
    // При создании диалога нужно создавать первое сообщение
    try {
      const { partner, lastMessage } = req.body
      const dialog = await new Dialogs({
        author: req.user.id,
        partner,
        lastMessage,
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

export default DialogController

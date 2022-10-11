import { Request, Response } from 'express'
import Dialogs from '../models/Dialogs'
import socket from 'socket.io'
import { v4 } from 'uuid'

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

  add = async (req: IRequest, res: Response) => {
    // При создании диалога нужно создавать первое сообщение
    try {
      const { partner, lastMessage } = req.body
      const dialog = await new Dialogs({
        _id: v4(),
        author: req.user.id,
        partner,
        lastMessage,
      })

      await dialog.save()
      this.io.emit('DIALOG_CREATED', dialog)
      res.json(dialog)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }

  async getList(req: IRequest, res: Response) {
    try {
      const userId = req.user.id

      const dialogs = await Dialogs.aggregate([
        {
          $match: {
            $or: [{ partner: userId }, { author: userId }],
          },
        },
        {$sort : {
          updatedAt: -1
        }},
        {
          $lookup: {
            from: 'users',
            localField: 'partner',
            foreignField: '_id',
            as: 'partner',
          },
        },
        { $unwind: '$partner' },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        { $unwind: '$author' },
        {
          $project: {
            id: '$_id',
            _id: 0,
            lastMessage: 1,
            updatedAt: 1,
            partner: {
              id: '$partner._id',
              name: '$partner.fullName',
              avatar: '$partner.avatar',
            },
            author: {
              id: '$author._id',
              name: '$author.fullName',
              avatar: '$author.avatar',
            },
          },
        },
      ])

      return res.json(dialogs)
    } catch (e) {
      console.log(e)
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

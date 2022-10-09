import { io } from './../index'
import { Request, Response } from 'express'
import Message from '../models/Message'
import socket from 'socket.io'
import Dialogs from '../models/Dialogs'
import { v4 } from 'uuid'

class MessageController {
  io: socket.Server
  constructor(io: socket.Server) {
    this.io = io
  }

  add = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const author = req.user.id

      const { text, dialogId } = req.body
      const message = new Message({
        _id: v4(),
        text,
        dialog: dialogId,
        author,
      })
      const dialog = await Dialogs.findById(dialogId)
      await message.save()
      this.io.emit('NEW_MESSAGE', message)
      res.json({ message, dialog })
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async getList(req: Request, res: Response) {
    try {
      const { dialogId } = req.params

      const messages = await Message.aggregate([
        {
          $match: {
            dialog: dialogId,
          },
        },
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
            unread: 1,
            text: 1,
            dialog: 1,
            createdAt: 1,
            author: {
              id: '$author._id',
              name: '$author.fullName',
              avatar: '$author.avatar',
            },
          },
        },
      ])

      return res.json(messages)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }

  async removeMessage(req: Request, res: Response) {
    try {
      const { id } = req.params
      await Message.findByIdAndDelete(id)
      res.json('success')
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default MessageController

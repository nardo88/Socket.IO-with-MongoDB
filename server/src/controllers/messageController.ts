import { io } from './../index'
import { Request, Response } from 'express'
import Message from '../models/Message'
import socket from 'socket.io'
import Dialogs from '../models/Dialogs'
import { v4 } from 'uuid'
import User from '../models/User'

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
      const message: any = new Message({
        _id: v4(),
        text,
        dialog: dialogId,
        author,
      })
      const dialog = await Dialogs.findOne({ _id: dialogId })
      if (dialog) {
        dialog.lastMessage = {
          userId: author,
          message: text,
          readed: false,
        }
      }

      dialog?.save()

      const autorProfile = await User.findOne({ _id: author })
      await message.save()
      this.io.emit('NEW_MESSAGE', {
        ...message?._doc,
        author: {
          avatar: autorProfile?.avatar || '',
          id: author,
          name: autorProfile?.fullName,
        },
      })
      res.json({ message, dialog })
    } catch (e) {
      console.log(e)
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
            _id: 1,
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

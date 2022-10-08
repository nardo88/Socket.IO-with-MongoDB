import { io } from './../index'
import { Request, Response } from 'express'
import Message from '../models/Message'
import socket from 'socket.io'
import Dialogs from '../models/Dialogs'
import {v4} from 'uuid'

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

      Message.find({ dialog: dialogId })
        .populate(['dialog'])
        .exec((err: any, messages: any) => {
          if (err) {
            return res.status(404).json('Messages not found')
          }
          return res.json(messages)
        })
    } catch (e) {
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

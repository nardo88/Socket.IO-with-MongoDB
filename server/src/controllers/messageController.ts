import { Request, Response } from 'express'
import Message from '../models/Message'

class MessageController {
  async add(req: Request, res: Response) {
    try {
      const { text, dialogId } = req.body
      const message = await new Message({
        text,
        dialog: dialogId,
      })

      await message.save()
      res.json(message)
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

export default new MessageController()

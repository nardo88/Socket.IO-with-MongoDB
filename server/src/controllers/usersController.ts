import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'

class UserController {
  async addUser(req: Request, res: Response) {
    try {
      const { email, fullName, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(500).json('User already exist')
      }

      const user = await new User({
        email,
        fullName,
        password: bcrypt.hashSync(password, 7),
        confirmHash: '',
        lastSeen: '',
      })

      await user.save()

      return res.json(user._id)
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      if (user) {
        return res.json(user)
      } else {
        return res.status(404).json('User not found')
      }
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const body = req.body

      await User.findByIdAndUpdate(id, body)
      return res.json('success')
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new UserController()

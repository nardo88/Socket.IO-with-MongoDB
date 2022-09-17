import { Request, Response } from 'express'
import User from '../schemas/User'
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
        confirmed: false,
        confirmHash: '',
        lastSeen: '',
      })

      return res.json(user._id)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new UserController()

import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import generateJWT from '../utils/generateJWT'
import { validationResult } from 'express-validator'
import socket from 'socket.io'
import {v4} from 'uuid'

class UserController {
  io: socket.Server
  constructor(io: socket.Server) {
    this.io = io
  }

  async registration(req: Request, res: Response) {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        res.status(400).json({ message: 'Ошибка при регистрации', error })
      }
      const { email, fullName, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.json({ status: 'error', message: 'User already exist' })
      }

      const user = await new User({
        _id: v4(),
        email,
        fullName,
        password: bcrypt.hashSync(password, 7),
        confirmHash: '' + new Date().valueOf(),
        lastSeen: '',
      })

      await user.save()

      return res.json(user)
    } catch (e) {
      console.log(e);
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

  async getMe(req: Request, res: Response) {
    try {
      // @ts-ignore
      const { id } = req.user
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

  async login(req: Request, res: Response) {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        res.json({ message: 'Ошибка при регистрации', error })
      }
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.json({ message: 'Неверный логин или пароль' })
      }
      if (!user.confirmed) {
        return res.json({
          status: 'error',
          message: 'Пользователь не подтвержден',
        })
      }

      const validate = bcrypt.compareSync(password, user.password)

      if (!validate) {
        return res.json({ message: 'Неверный логин или пароль' })
      }

      const token = generateJWT(user._id)
      res.json({ token })
    } catch (e) {
      return res.status(500).json(e)
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const { hash } = req.params
      const user = await User.findOne({ confirmHash: hash, confirmed: false })
      if (!user) {
        return res.json({ status: 'error', message: 'Hash not found' })
      }
      user.confirmed = true
      await user.save()
      const token = generateJWT(user._id)
      res.json({ token })
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default UserController

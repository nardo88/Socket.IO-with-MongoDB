import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User'

interface IRequest extends Request {
  user?: any
}

interface IDecoded {
  id: string
}

dotenv.config()

const authMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.json({ message: 'Auth error' })
    }
    const secretKey = process.env.JWT_SECRET as string
    const decoded: IDecoded = jwt.verify(token, secretKey) as IDecoded
    req.user = decoded

    await User.findByIdAndUpdate(decoded.id, {
      lastSeen: new Date(),
    })

    next()
  } catch (e: any) {
    res.status(500).json({ message: 'Error from validate token' })
  }
}

export default authMiddleware

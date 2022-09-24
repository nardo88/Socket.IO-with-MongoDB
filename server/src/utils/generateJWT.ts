import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateJWT = (id: any) => {
  const secret: string = process.env.JWT_SECRET as string
  const payload = {
    id,
  }

  return jwt.sign(payload, secret, { expiresIn: '1w' })
}

export default generateJWT

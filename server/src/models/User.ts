import mongoose from 'mongoose'

interface UserTypes {
  _id: string
  email: string
  fullName: string
  password: string
  confirmed: boolean
  confirmHash: string
  lastSeen: Date
  avatar?: string
}

const User = new mongoose.Schema<UserTypes>(
  {
    _id: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmHash: String,
    lastSeen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', User)

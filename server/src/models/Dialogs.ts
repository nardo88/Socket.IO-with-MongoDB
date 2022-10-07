import mongoose, { Schema } from 'mongoose'

interface DialogTypes {
  author: Schema.Types.ObjectId
  partner: Schema.Types.ObjectId
  lastMessage?: {
    userId: Schema.Types.ObjectId
    message: string
    readed: boolean
  }
}

const Dialog = new Schema<DialogTypes>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    partner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    lastMessage: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      message: String,
      readed: {
        type: Schema.Types.Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Dialog', Dialog)

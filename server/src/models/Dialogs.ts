import mongoose, { Schema } from 'mongoose'

interface DialogTypes {
  _id: string
  author: Schema.Types.String
  partner: Schema.Types.String
  lastMessage?: {
    userId: Schema.Types.String
    message: string
    readed: boolean
  }
}

const Dialog = new Schema<DialogTypes>(
  {
    _id: String,
    author: {
      type: Schema.Types.String,
      required: true,
      ref: 'User',
    },
    partner: {
      type: Schema.Types.String,
      required: true,
      ref: 'User',
    },
    lastMessage: {
      userId: {
        type: Schema.Types.String,
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

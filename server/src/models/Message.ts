import mongoose, { Schema } from 'mongoose'

interface MessageTypes {
  _id: string
  text: string
  unread: boolean
  dialog: string
  author: string
}

const Message = new Schema<MessageTypes>(
  {
    _id: String,
    text: {
      type: Schema.Types.String,
      required: true,
    },
    unread: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    dialog: { type: Schema.Types.String, ref: 'Dialog' },
    author: { type: Schema.Types.String, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Message', Message)

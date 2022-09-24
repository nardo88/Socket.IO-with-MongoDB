import mongoose, { Schema } from 'mongoose'

interface MessageTypes {
  text: string
  unread: boolean
  dialog: Schema.Types.ObjectId
}

const Message = new Schema<MessageTypes>(
  {
    text: {
      type: Schema.Types.String,
      required: true,
    },
    unread: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Message', Message)
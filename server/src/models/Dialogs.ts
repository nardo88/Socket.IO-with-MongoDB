import mongoose, { Schema } from 'mongoose'

interface DialogTypes {
  author: Schema.Types.ObjectId
  partner: Schema.Types.ObjectId
  lastMessage: string
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
    lastMessage: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Dialog', Dialog)

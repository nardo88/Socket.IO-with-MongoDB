import mongoose from 'mongoose'

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    fullName:  {
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmHash: String,
    lastSeen: String,

}, {
    timestamps: true
})

export default mongoose.model('User', User)
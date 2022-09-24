import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import constants from './constants/constants'
import router from './routers/index'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({}))

app.use('/user', router.user)
app.use('/dialog', router.dialogs)
app.use('/messages', router.message)

const start = async () => {
  await mongoose.connect(constants.mongoUrl)

  app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
  })
}

start()

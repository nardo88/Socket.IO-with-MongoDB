import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import constants from './constants/constants'
import router from './routers/index'

const app = express()

app.use(express.json())
app.use(cors({}))

app.use('/user', router.user)

const start = async () => {
  await mongoose.connect(constants.mongoUrl)

  app.listen(5000, () => {
    console.log('server started...')
  })
}

start()

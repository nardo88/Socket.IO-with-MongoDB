import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import constants from './constants/constants'
import router from './routers/index'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors({}))

app.use('/dialog', router.dialogs)
app.use('/user', router.user)
app.use('/messages', router.message)

const io = new Server(server, {
  cors: {
    // разрешаем подключаться с любых адресов
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('SOCKET')
})

const start = async () => {
  await mongoose.connect(constants.mongoUrl)

  server.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
  })
}

start()

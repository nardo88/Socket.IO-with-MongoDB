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

export const io = new Server(server, {
  cors: {
    // разрешаем подключаться с любых адресов
    origin: '*',
  },
})

//  TODO необходимо написать функцию, которая будет создавать роуты и в которой будут создаваться контроллеры в конструктор которых будет передан io
const createRouters = (app: any, io: any) => {}

app.use(express.json())
app.use(cors({}))

app.use('/dialog', router.dialogs)
app.use('/user', router.user)
app.use('/messages', router.message)

io.on('connection', (socket) => {
  console.log('SOCKET')

  socket.on('NEW_MESSAGE', (message: any) => {
    console.log(`client sed ${message}`)
  })
})

const start = async () => {
  await mongoose.connect(constants.mongoUrl)
  server.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
  })
}

start()

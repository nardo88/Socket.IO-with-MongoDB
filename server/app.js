import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())
app.use(cors({}))

const start = async () => {

    app.listen(5000, () => {
        console.log('server started...')
    })
}

start()
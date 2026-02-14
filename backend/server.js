import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'

import { clerkMiddleware } from '@clerk/express'

import {connectDB} from './config/db.js'

import path from 'path'
import invoiceRouter from './routes/invoiceRouter.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({limit: '20mb', extended: true}))

// Connect to MongoDB
connectDB()

//routes

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))
app.use('/api/invoices', invoiceRouter)

app.get('/', (req, res) => {
  res.send('API Working!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

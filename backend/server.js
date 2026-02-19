import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'

import { clerkMiddleware } from '@clerk/express'

import {connectDB} from './config/db.js'

import path from 'path'
import invoiceRouter from './routes/invoiceRouter.js'
import businessProfileRouter from './routes/businessProfileRoute.js'
import aiInvoiceRouter from './routes/aiInvoiceRouter.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
}))
app.use(clerkMiddleware({ publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }))
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({limit: '20mb', extended: true}))

// Connect to MongoDB
connectDB()

//routes

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))
app.use('/api/invoices', invoiceRouter)
app.use('/api/businessProfile', businessProfileRouter)
app.use('/api/ai', aiInvoiceRouter) // AI invoice generation route

app.get('/', (req, res) => {
  res.send('API Working!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

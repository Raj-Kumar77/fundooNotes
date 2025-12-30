import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'

const app = express()

const port = process.env.PORT || 6000

connectDB()

app.get('/', (req, res)=>{
    res.send('welcome to server')
})

app.listen(port, ()=>console.log(`Server started on port: ${port}`))
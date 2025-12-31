import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import cors from 'cors'
import userRouter from './route/userRoute.js'
import labelRouter from './route/labelRoute.js'
import noteRouter from './route/noteRoute.js'

const app = express()

const port = process.env.PORT || 6000

connectDB()

app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/label', labelRouter)
app.use('/api/v1/note', noteRouter)

app.get('/', (req, res)=>{
    res.send('welcome to server')
})

app.listen(port, ()=>console.log(`Server started on port: ${port}`))
import express from 'express'
import { createLabel } from '../controller/labelController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const labelRouter = express.Router()

labelRouter.post('/create', authMiddleware, createLabel)

export default labelRouter
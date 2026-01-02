import express from 'express'
import { createLabel, deleteLabel, getAllLabels, getLabel, updateLabel } from '../controller/labelController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const labelRouter = express.Router()

labelRouter.post('/', authMiddleware, createLabel)
labelRouter.get('/', authMiddleware, getAllLabels)
labelRouter.get('/:id', authMiddleware, getLabel)
labelRouter.patch('/:id', authMiddleware, updateLabel)
labelRouter.delete('/:id', authMiddleware, deleteLabel)

export default labelRouter
import express from 'express'
import { createNote, getAllNotes, getAllPinnedNotes, getNote, pinNote, removeNote } from '../controller/noteController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/', authMiddleware ,createNote)
noteRouter.get('/', authMiddleware, getAllNotes)
noteRouter.get('/pin', authMiddleware, getAllPinnedNotes)
noteRouter.patch('/pin/:id', authMiddleware, pinNote)
noteRouter.get('/:id', authMiddleware, getNote)
noteRouter.delete('/:id', authMiddleware, removeNote)

export default noteRouter
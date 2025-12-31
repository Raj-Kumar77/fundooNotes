import Note from "../model/note.js";

const createNote = async (req, res) => {
    try {

        const { title, content, color, labels } = req.body

        let newNote = await Note.create({
            title, content, color, labels, user: req.user.id
        })

        newNote = await newNote.populate('labels', 'name color')

        res.status(201).json({ success: true, message: 'Note created', note: newNote })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).populate('labels', 'name color')
        res.status(200).json({ success: true, message: 'All notes', notes })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getNote = async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findOne({ _id: id, user: req.user.id }).populate('labels', 'name color')
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found or not authorized'
            });
        }
        res.status(200).json({ success: true, message: 'Note fetched', note })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const removeNote = async (req, res) => {
    try {
        const { id } = req.params
        const removedNote = await Note.findOneAndDelete({ _id: id, user: req.user.id })
        if (!removedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found or not authorized'
            });
        }
        res.status(200).json({ success: true, message: 'Note deleted', removedNote })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const pinNote = async (req, res) => {
    try {

        const { id } = req.params

        const note = await Note.findOne({ _id: id, user: req.user.id })

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found or not authorized'
            });
        }

        note.isPinned = !note.isPinned

        await note.save()
        await note.populate('labels', 'name color');


        res.status(200).json({ success: true, message: note.isPinned ? 'Note pinned' : 'Note unpinned', note })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const getAllPinnedNotes = async (req, res) => {
    try {
        const pinnedNotes = await Note.find({
            user: req.user.id,     // only this user notes
            isPinned: true,
            isArchived: false
        })
            //.populate('user', 'name email')
            .populate('labels', 'name color');

        res.status(200).json({
            success: true,
            message: 'All pinned notes',
            pinnedNotes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { createNote, getAllNotes, getNote, removeNote, pinNote, getAllPinnedNotes }
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#ffffff"
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  labels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema)

export default Note

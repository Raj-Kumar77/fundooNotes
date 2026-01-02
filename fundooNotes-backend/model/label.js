import mongoose from "mongoose";

const LabelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#cccccc"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });


const Label = mongoose.model('Label', LabelSchema)

export default Label
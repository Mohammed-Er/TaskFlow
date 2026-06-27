import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A todo title is mandatory"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false, 
  },
}, { timestamps: true });

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A todo title is mandatory"],
    trim: true, // Automatically cuts off accidental trailing spaces
  },
  completed: {
    type: Boolean,
    default: false, // New tasks are uncompleted by default
  },
}, { timestamps: true });

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
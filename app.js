import express from "express";
import Todo from "./models/todo.js";
const app = express();

app.use(express.json());

// A simple root health check route can stay!
app.get("/", (req, res) => {
  res.send("Todo API Running");
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title });

    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default app;

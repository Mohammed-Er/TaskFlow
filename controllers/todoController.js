import Todo from "../models/Todo.js";

export const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({
      title,
    });

    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deleteTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


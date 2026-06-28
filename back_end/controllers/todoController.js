import Todo from "../models/Todo.js";

export const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({
      title,
      user: req.user._id,
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
    const todos = await Todo.find({
      user: req.user._id,
    });
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
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
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
    const deleteTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

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

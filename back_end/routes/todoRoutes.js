import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getTodos)
  .post(authMiddleware, createTodo);

router
  .route("/:id")
  .put(authMiddleware, updateTodo)
  .delete(authMiddleware, deleteTodo);

export default router;

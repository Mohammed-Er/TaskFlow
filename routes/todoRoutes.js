import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;

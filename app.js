import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo API Running");
});

app.use("/api/todos", todoRoutes);

app.use("/api/users", authRoutes);

app.use(errorHandler)
export default app;

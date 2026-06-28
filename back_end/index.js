import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startServer();

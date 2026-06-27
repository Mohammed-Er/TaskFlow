import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({
        message: "Username already exists",
      });
    } else if (password.length < 6) {
      return res.status(409).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

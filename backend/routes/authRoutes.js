import express from "express";
import { logOut, login, register } from "../controller/authController.js";
import { protect } from "../middleware/auth.js";
import User from "../model/userModel.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);

// ✅ NEW: check logged-in user
authRoutes.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default authRoutes;

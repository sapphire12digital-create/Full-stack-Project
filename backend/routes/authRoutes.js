import express from "express";
import { logOut, login, register, googleLogin } from "../controller/authController.js";
import { protect } from "../middleware/isAuth.js";
import User from "../model/userModel.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/googleLogin", googleLogin);
authRoutes.get("/logout", logOut);

authRoutes.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default authRoutes;

import express from "express";
import { logOut ,login, register } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);

export default authRoutes;

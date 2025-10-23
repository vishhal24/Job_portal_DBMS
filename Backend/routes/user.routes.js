import express from "express";
import {Logout, register, login, updateProfile } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("user api working");
});
router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", authenticateToken, updateProfile);
router.post("/logout",Logout);

export default router;

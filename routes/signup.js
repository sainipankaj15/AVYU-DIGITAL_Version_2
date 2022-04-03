import express from "express";
import { signUp, signuppage } from "../controllers/signup.js";

const router = express.Router();

router.post('/signup',signUp);
router.get('/signup',signuppage);

export default router;
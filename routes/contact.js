import express from "express";
import { postContact } from "../controllers/contact.js";

const router = express.Router();

router.post('/contact-us',postContact);

export default router;
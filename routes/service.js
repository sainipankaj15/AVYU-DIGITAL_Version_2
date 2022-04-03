import express from "express";
import { addService, getService } from "../controllers/service.js";

const router = express.Router();

router.post('/addservice', addService);
router.get('/addservice', getService);

export default router;
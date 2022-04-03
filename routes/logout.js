import express from "express"
import { logout } from "../controllers/logout.js";

const route = express.Router();

route.get('/logout',logout);

export default route;
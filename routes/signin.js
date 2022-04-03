import express from "express";
import { logIn, signIn } from "../controllers/signin.js";

const route =  express.Router();

route.get('/signin',signIn);
route.post('/signin',logIn);

export default route;
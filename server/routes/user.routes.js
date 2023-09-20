import {  Router } from "express";

import { getProfile,login,logout,register } from "../controllers/user.controller.js";

import upload from "../middleware/multer.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router= Router();


router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn);


export default router 
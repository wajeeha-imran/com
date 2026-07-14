import express from "express";

import {
  register,
  login,
  profile
} from "../controllers/authController.js";

import auth from "../middleware/auth.js";


const router = express.Router();



// Register user

router.post(
  "/register",
  register
);



// Login user

router.post(
  "/login",
  login
);



// Get profile

router.get(
  "/profile",
  auth,
  profile
);



export default router;
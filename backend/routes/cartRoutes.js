import express from "express";


import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
} from "../controllers/cartController.js";


import auth from "../middleware/auth.js";



const router = express.Router();



// Get user cart

router.get(
  "/",
  auth,
  getCart
);




// Add product to cart

router.post(
  "/",
  auth,
  addToCart
);




// Update cart quantity

router.put(
  "/:id",
  auth,
  updateCart
);




// Remove item from cart

router.delete(
  "/:id",
  auth,
  removeFromCart
);



export default router;
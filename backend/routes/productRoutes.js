import express from "express";

import {
  getProducts,
  getProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js";


import auth from "../middleware/auth.js";

import admin from "../middleware/admin.js";

import upload from "../config/multer.js";



const router = express.Router();



// Get all products

router.get(
  "/",
  getProducts
);



// Search products

router.get(
  "/search",
  searchProducts
);



// Get single product

router.get(
  "/:id",
  getProduct
);



// Create product with image (Admin)

router.post(

  "/",

  auth,

  admin,

  upload.single("image"),

  createNewProduct

);



// Update product with image (Admin)

router.put(

  "/:id",

  auth,

  admin,

  upload.single("image"),

  updateProduct

);



// Delete product (Admin)

router.delete(

  "/:id",

  auth,

  admin,

  deleteProduct

);



export default router;
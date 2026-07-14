import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import errorHandler from "./middleware/errorHandler.js";


const app = express();


// CORS

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://com-md3k.vercel.app",
    ],
    credentials: true,
  })
);



// Body parser

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);



// Upload images

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);



// Test API

app.get("/", (req,res)=>{

  res.send(
    "E-commerce API is running 🚀"
  );

});



// Routes

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/products",
  productRoutes
);


app.use(
  "/api/cart",
  cartRoutes
);


app.use(
  "/api/orders",
  orderRoutes
);



// Error Handler

app.use(errorHandler);


export default app;

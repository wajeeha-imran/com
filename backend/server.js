import "dotenv/config";

import app from "./app.js";

import { AppDataSource } from "./config/datasource.js";



const PORT = process.env.PORT || 5000;



AppDataSource.initialize()

  .then(() => {


    console.log(
      "✅ PostgreSQL Database Connected"
    );


    app.listen(PORT, () => {


      console.log(
        `🚀 Server running on port ${PORT}`
      );


    });


  })

  .catch((error) => {


    console.log(
      "❌ Database connection failed:",
      error
    );


  });
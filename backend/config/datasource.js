import "reflect-metadata";
import { DataSource } from "typeorm";

import User from "../entities/User.js";
import Category from "../entities/Category.js";
import Product from "../entities/Product.js";
import Cart from "../entities/Cart.js";
import CartItem from "../entities/CartItem.js";
import Order from "../entities/Order.js";
import OrderItem from "../entities/OrderItem.js";


export const AppDataSource = new DataSource({

  type: "postgres",

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,


  synchronize: true,

  logging: false,


  entities: [

    User,

    Category,

    Product,

    Cart,

    CartItem,

    Order,

    OrderItem

  ],


  ssl: {

    rejectUnauthorized: false

  },


  migrations: [],

  subscribers: []

});
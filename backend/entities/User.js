import { EntitySchema } from "typeorm";

const User = new EntitySchema({

  name: "User",

  tableName: "users",

  columns: {

    id: {
      primary: true,
      generated: true,
      type: "int",
    },


    name: {
      type: "varchar",
    },


    email: {
      type: "varchar",
      unique: true,
    },


    password: {
      type: "varchar",
    },


    role: {
      type: "varchar",
      default: "customer",
    },


    createdAt: {
      type: "timestamp",
      createDate: true,
    },


    updatedAt: {
      type: "timestamp",
      updateDate: true,
    }

  },


  relations: {

    orders: {

      target: "Order",

      type: "one-to-many",

      inverseSide: "user",

    },


    cart: {

      target: "Cart",

      type: "one-to-one",

      inverseSide: "user",

    }

  }

});


export default User;
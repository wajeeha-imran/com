import { EntitySchema } from "typeorm";


const Cart = new EntitySchema({

  name: "Cart",

  tableName: "carts",


  columns: {

    id: {

      primary: true,

      generated: true,

      type: "int",

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


    user: {

      target: "User",

      type: "one-to-one",

      joinColumn: true,

      inverseSide: "cart",

    },


    items: {

      target: "CartItem",

      type: "one-to-many",

      inverseSide: "cart",

      cascade: true,

    }


  }


});


export default Cart;
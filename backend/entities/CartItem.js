import { EntitySchema } from "typeorm";


const CartItem = new EntitySchema({

  name: "CartItem",

  tableName: "cart_items",


  columns: {

    id: {

      primary: true,

      generated: true,

      type: "int",

    },


    quantity: {

      type: "int",

      default: 1,

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


    cart: {

      target: "Cart",

      type: "many-to-one",

      joinColumn: true,

      inverseSide: "items",

      onDelete: "CASCADE",

    },


    product: {

      target: "Product",

      type: "many-to-one",

      joinColumn: true,

      inverseSide: "cartItems",

      onDelete: "CASCADE",

    }


  }


});


export default CartItem;
import { EntitySchema } from "typeorm";


const OrderItem = new EntitySchema({

  name: "OrderItem",

  tableName: "order_items",


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


    price: {

      type: "decimal",

      precision: 10,

      scale: 2,

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


    order: {

      target: "Order",

      type: "many-to-one",

      joinColumn: true,

      inverseSide: "items",

      onDelete: "CASCADE",

    },


    product: {

      target: "Product",

      type: "many-to-one",

      joinColumn: true,

      inverseSide: "orderItems",

    }


  }


});


export default OrderItem;
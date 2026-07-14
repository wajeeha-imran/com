import { EntitySchema } from "typeorm";


const Order = new EntitySchema({

  name: "Order",

  tableName: "orders",


  columns: {

    id: {

      primary: true,

      generated: true,

      type: "int",

    },


    totalAmount: {

      type: "decimal",

      precision: 10,

      scale: 2,

    },


    status: {

      type: "varchar",

      default: "pending",

    },


    paymentStatus: {

      type: "varchar",

      default: "unpaid",

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

      type: "many-to-one",

      joinColumn: true,

      inverseSide: "orders",

    },


    items: {

      target: "OrderItem",

      type: "one-to-many",

      inverseSide: "order",

      cascade: true,

    }


  }


});


export default Order;
import { EntitySchema } from "typeorm";

const Product = new EntitySchema({
  name: "Product",
  tableName: "products",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    name: {
      type: "varchar",
    },

    description: {
      type: "text",
    },

    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    stock: {
      type: "int",
      default: 0,
    },

    image: {
      type: "varchar",
      nullable: true,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    cartItems: {
      target: "CartItem",
      type: "one-to-many",
      inverseSide: "product",
    },

    orderItems: {
      target: "OrderItem",
      type: "one-to-many",
      inverseSide: "product",
    },
  },
});

export default Product;
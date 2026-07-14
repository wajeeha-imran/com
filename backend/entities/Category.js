import { EntitySchema } from "typeorm";


const Category = new EntitySchema({

  name: "Category",

  tableName: "categories",


  columns: {

    id: {

      primary: true,

      generated: true,

      type: "int",

    },


    name: {

      type: "varchar",

      unique: true,

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


    products: {

      target: "Product",

      type: "one-to-many",

      inverseSide: "category",

    }


  }


});


export default Category;
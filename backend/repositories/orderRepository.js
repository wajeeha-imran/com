import { AppDataSource } from "../config/datasource.js";


const orderRepository = AppDataSource.getRepository("Order");

const orderItemRepository = AppDataSource.getRepository("OrderItem");



// Create order

export const createOrder = async (orderData) => {


  const order = orderRepository.create(orderData);


  return await orderRepository.save(order);


};




// Add order item

export const createOrderItem = async (itemData) => {


  const item = orderItemRepository.create(itemData);


  return await orderItemRepository.save(item);


};




// Get orders by user

export const getOrdersByUserId = async (userId) => {


  return await orderRepository.find({

    where: {

      user: {

        id: userId,

      },

    },


    relations: {

      items: {

        product: true,

      },

    },


    order: {

      createdAt: "DESC",

    },


  });


};




// Get single order

export const getOrderById = async (id) => {


  return await orderRepository.findOne({

    where: {

      id,

    },


    relations: {

      user: true,


      items: {

        product: true,

      },

    },


  });


};




// Update order status

export const updateOrderStatus = async (id, status) => {


  await orderRepository.update(

    id,

    {
      status,
    }

  );


  return await getOrderById(id);


};



export default orderRepository;
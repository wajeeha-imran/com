import {
  createOrder,
  createOrderItem,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus
} from "../repositories/orderRepository.js";

import {
  getCartByUserId
} from "../repositories/cartRepository.js";

import { AppDataSource } from "../config/datasource.js";



// Create order from cart

export const placeOrder = async (userId) => {


  const cart = await getCartByUserId(userId);
  
  console.log("USER ID:", userId);
  console.log("CART:", cart);


  if (!cart || cart.items.length === 0) {

    throw new Error(
      "Cart is empty"
    );

  }



  let totalAmount = 0;



  cart.items.forEach((item)=>{


    totalAmount +=

      Number(item.product.price)

      *

      item.quantity;


  });




  const userRepository =
    AppDataSource.getRepository("User");



  const user = await userRepository.findOne({

    where:{
      id:userId
    }

  });




  const order = await createOrder({

    user,

    totalAmount,

    status:"pending",

    paymentStatus:"unpaid"

  });





  for(const item of cart.items){


    await createOrderItem({

      order,

      product:item.product,

      quantity:item.quantity,

      price:item.product.price

    });


  }




  return order;

};




// Get user orders

export const fetchUserOrders = async (userId) => {


  return await getOrdersByUserId(userId);


};




// Get single order

export const fetchOrderDetails = async (id) => {


  const order = await getOrderById(id);



  if(!order){

    throw new Error(
      "Order not found"
    );

  }



  return order;

};




// Change order status

export const changeOrderStatus = async (

  id,

  status

)=>{


  return await updateOrderStatus(

    id,

    status

  );

};
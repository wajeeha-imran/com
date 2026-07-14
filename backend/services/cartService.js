import {
  getCartByUserId,
  createCart,
  addCartItem,
  findCartItem,
  updateCartItem,
  removeCartItem
} from "../repositories/cartRepository.js";

import { AppDataSource } from "../config/datasource.js";



// Get user cart

export const fetchUserCart = async (userId) => {


  let cart = await getCartByUserId(userId);



  if (!cart) {


    const userRepository = AppDataSource.getRepository("User");


    const user = await userRepository.findOne({

      where: {
        id: userId
      }

    });


    cart = await createCart(user);

  }



  return cart;

};




// Add product to cart

export const addProductToCart = async (

  userId,

  product,

  quantity

) => {



  const cart = await fetchUserCart(userId);



  const existingItem = await findCartItem(

    cart.id,

    product.id

  );



  if (existingItem) {


    return await updateCartItem(

      existingItem.id,

      existingItem.quantity + quantity

    );

  }




  return await addCartItem({

    cart,

    product,

    quantity

  });

};




// Update cart quantity

export const changeCartQuantity = async (

  itemId,

  quantity

) => {


  if (quantity <= 0) {

    throw new Error(
      "Quantity must be greater than zero"
    );

  }



  return await updateCartItem(

    itemId,

    quantity

  );

};




// Remove item from cart

export const deleteCartItem = async (itemId) => {


  return await removeCartItem(itemId);

};




// Calculate total price

export const calculateCartTotal = (cart) => {


  let total = 0;



  cart.items.forEach((item)=>{


    total +=

      Number(item.product.price)

      *

      item.quantity;


  });



  return total;

};
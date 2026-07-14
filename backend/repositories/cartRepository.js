import { AppDataSource } from "../config/datasource.js";


const cartRepository = AppDataSource.getRepository("Cart");
const cartItemRepository = AppDataSource.getRepository("CartItem");


// Find cart by user id

export const getCartByUserId = async (userId) => {

  return await cartRepository.findOne({

    where: {

      user: {
        id: userId,
      },

    },


    relations: {

      items: {

        product: true,

      },

      user: true,

    },

  });

};



// Create new cart

export const createCart = async (user) => {


  const cart = cartRepository.create({

    user,

  });


  return await cartRepository.save(cart);

};



// Add item to cart

export const addCartItem = async (cartItemData) => {


  const item = cartItemRepository.create(cartItemData);


  return await cartItemRepository.save(item);

};



// Find cart item

export const findCartItem = async (cartId, productId) => {


  return await cartItemRepository.findOne({

    where: {

      cart: {

        id: cartId,

      },


      product: {

        id: productId,

      },

    },

  });


};



// Update cart quantity

export const updateCartItem = async (id, quantity) => {


  await cartItemRepository.update(

    id,

    {
      quantity,
    }

  );


  return await cartItemRepository.findOne({

    where: {
      id,
    },

    relations: {

      product: true,

    },

  });

};



// Remove cart item

export const removeCartItem = async (id) => {


  return await cartItemRepository.delete(id);


};



export default cartRepository;
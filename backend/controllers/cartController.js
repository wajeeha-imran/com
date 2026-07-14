import {
  fetchUserCart,
  addProductToCart,
  changeCartQuantity,
  deleteCartItem
} from "../services/cartService.js";

import {
  fetchProductById
} from "../services/productService.js";




// Get User Cart

export const getCart = async (req, res) => {

  try {


    const cart = await fetchUserCart(

      req.user.id

    );



    res.status(200).json({

      cart

    });



  } catch(error) {


    res.status(400).json({

      message:error.message

    });


  }

};





// Add Product To Cart

export const addToCart = async (req,res)=>{


  try{


    const {

      productId,

      quantity

    } = req.body;



    const product = await fetchProductById(

      productId

    );



    const item = await addProductToCart(

      req.user.id,

      product,

      quantity || 1

    );



    res.status(201).json({

      message:"Product added to cart",

      item

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};





// Update Cart Quantity

export const updateCart = async(req,res)=>{


  try{


    const item = await changeCartQuantity(

      Number(req.params.id),

      req.body.quantity

    );



    res.status(200).json({

      message:"Cart updated",

      item

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};





// Remove Cart Item

export const removeFromCart = async(req,res)=>{


  try{


    await deleteCartItem(

      Number(req.params.id)

    );



    res.status(200).json({

      message:"Item removed from cart"

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};
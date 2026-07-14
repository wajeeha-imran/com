import {
  placeOrder,
  fetchUserOrders,
  fetchOrderDetails,
  changeOrderStatus
} from "../services/orderService.js";




// Create Order

export const createOrder = async (req, res) => {

   console.log("🔥 ORDER API HIT");
  try {

    const order = await placeOrder(req.user.id);

    res.status(201).json({
      message:"Order created successfully",
      order
    });

  } catch(error) {

  console.log("ORDER ERROR:", error);

  res.status(400).json({
    message:error.message
  });

}

};





// Get User Orders

export const getOrders = async(req,res)=>{


  try{


    const orders = await fetchUserOrders(

      req.user.id

    );



    res.status(200).json({

      orders

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};





// Get Single Order

export const getOrder = async(req,res)=>{


  try{


    const order = await fetchOrderDetails(

      Number(req.params.id)

    );



    res.status(200).json({

      order

    });



  }catch(error){


    res.status(404).json({

      message:error.message

    });


  }


};





// Update Order Status (Admin)

export const updateOrder = async(req,res)=>{


  try{


    const order = await changeOrderStatus(

      Number(req.params.id),

      req.body.status

    );



    res.status(200).json({

      message:"Order status updated",

      order

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct,
  searchProductList
} from "../services/productService.js";




// Get all products

export const getProducts = async (req, res) => {

  try {


    const products = await fetchProducts();


    res.status(200).json({

      products

    });



  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};





// Get single product

export const getProduct = async(req,res)=>{


  try{


    const product = await fetchProductById(

      Number(req.params.id)

    );


    res.status(200).json({

      product

    });



  }catch(error){


    res.status(404).json({

      message:error.message

    });


  }


};





// Create Product (Admin)

export const createNewProduct = async(req,res)=>{


  try{


    const productData = {


      ...req.body,


      image: req.file

        ? req.file.filename

        : null


    };



    const product = await addProduct(

      productData

    );



    res.status(201).json({

      message:"Product created successfully",

      product

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};






// Update Product (Admin)

export const updateProduct = async(req,res)=>{


  try{


    const productData = {


      ...req.body,


      ...(req.file && {

        image:req.file.filename

      })

    };




    const product = await editProduct(

      Number(req.params.id),

      productData

    );



    res.status(200).json({

      message:"Product updated successfully",

      product

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};





// Delete Product (Admin)

export const deleteProduct = async(req,res)=>{


  try{


    await removeProduct(

      Number(req.params.id)

    );



    res.status(200).json({

      message:"Product deleted successfully"

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};





// Search Products

export const searchProducts = async(req,res)=>{


  try{


    const products = await searchProductList(

      req.query.keyword

    );



    res.status(200).json({

      products

    });



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }


};
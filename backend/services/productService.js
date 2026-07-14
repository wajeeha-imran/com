import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../repositories/productRepository.js";



// Get all products

export const fetchProducts = async () => {

  return await getAllProducts();

};




// Get single product

export const fetchProductById = async (id) => {


  const product = await getProductById(id);



  if (!product) {

    throw new Error("Product not found");

  }



  return product;

};




// Create product

export const addProduct = async (productData) => {


  return await createProduct(productData);

};




// Update product

export const editProduct = async (id, productData) => {


  const product = await getProductById(id);



  if (!product) {

    throw new Error("Product not found");

  }



  return await updateProduct(

    id,

    productData

  );

};




// Delete product

export const removeProduct = async (id) => {


  const product = await getProductById(id);



  if (!product) {

    throw new Error("Product not found");

  }



  return await deleteProduct(id);

};




// Search product

export const searchProductList = async (keyword) => {


  return await searchProducts(keyword);

};
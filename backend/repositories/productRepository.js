import { AppDataSource } from "../config/datasource.js";

const productRepository = AppDataSource.getRepository("Product");


// Get all products
export const getAllProducts = async () => {

  return await productRepository.find();

};



// Get single product by id
export const getProductById = async (id) => {

  return await productRepository.findOne({
    where: {
      id
    }
  });

};



// Create product
export const createProduct = async (productData) => {

  const product = productRepository.create(productData);

  return await productRepository.save(product);

};



// Update product
export const updateProduct = async (id, productData) => {

  await productRepository.update(
    id,
    productData
  );


  return await getProductById(id);

};



// Delete product
export const deleteProduct = async (id) => {

  return await productRepository.delete(id);

};



// Search products
export const searchProducts = async (keyword) => {

  return await productRepository
    .createQueryBuilder("product")
    .where(
      "LOWER(product.name) LIKE LOWER(:keyword)",
      {
        keyword: `%${keyword}%`
      }
    )
    .getMany();

};


export default productRepository;
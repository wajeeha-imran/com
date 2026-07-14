import { AppDataSource } from "../config/datasource.js";


const userRepository = AppDataSource.getRepository("User");


// Create new user

export const createUser = async (userData) => {

  const user = userRepository.create(userData);

  return await userRepository.save(user);

};



// Find user by email

export const findUserByEmail = async (email) => {

  return await userRepository.findOne({

    where: {
      email,
    },

  });

};



// Find user by id

export const findUserById = async (id) => {

  return await userRepository.findOne({

    where: {
      id,
    },

  });

};



// Get all users (Admin)

export const getAllUsers = async () => {

  return await userRepository.find();

};



export default userRepository;
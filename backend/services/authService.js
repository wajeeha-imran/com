import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
  findUserById
} from "../repositories/userRepository.js";



// Register User

export const registerUser = async (userData) => {


  const existingUser = await findUserByEmail(
    userData.email
  );


  if (existingUser) {

    throw new Error("Email already exists");

  }



  const hashedPassword = await bcrypt.hash(

    userData.password,

    10

  );



  const user = await createUser({

    name: userData.name,

    email: userData.email,

    password: hashedPassword,

    role: userData.role || "customer"

  });



  return user;

};




// Login User

export const loginUser = async (

  email,

  password

) => {



  const user = await findUserByEmail(email);



  if (!user) {

    throw new Error("Invalid email or password");

  }



  const isPasswordCorrect = await bcrypt.compare(

    password,

    user.password

  );



  if (!isPasswordCorrect) {

    throw new Error("Invalid email or password");

  }




  const token = jwt.sign(

    {

      id: user.id,

      role: user.role

    },


    process.env.JWT_SECRET,


    {

      expiresIn: "7d"

    }

  );




  return {

    user: {

      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role

    },

    token

  };

};




// Get Profile

export const getProfile = async (id) => {


  const user = await findUserById(id);



  if (!user) {

    throw new Error("User not found");

  }



  return {

    id: user.id,

    name: user.name,

    email: user.email,

    role: user.role

  };


};
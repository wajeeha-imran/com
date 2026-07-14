import {
  registerUser,
  loginUser,
  getProfile
} from "../services/authService.js";



// Register Controller

export const register = async (req, res) => {

  try {


    const user = await registerUser(
      req.body
    );


    res.status(201).json({

      message: "User registered successfully",

      user

    });



  } catch (error) {


    res.status(400).json({

      message: error.message

    });


  }

};




// Login Controller

export const login = async (req, res) => {


  try {


    const { email, password } = req.body;



    const result = await loginUser(

      email,

      password

    );



    res.status(200).json(result);



  } catch(error){


    res.status(401).json({

      message:error.message

    });


  }


};




// Profile Controller

export const profile = async (req,res)=>{


  try{


    const user = await getProfile(

      req.user.id

    );



    res.status(200).json({

      user

    });



  }catch(error){


    res.status(404).json({

      message:error.message

    });


  }


};
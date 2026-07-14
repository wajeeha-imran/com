import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "../../styles/productForm.css";


function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();


  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    name: "",

    description: "",

    price: "",

    stock: "",

    image: null

  });





  useEffect(() => {


    if (!user || user.role !== "admin") {

      navigate("/");

      return;

    }


    fetchProduct();


  }, [user]);






  const fetchProduct = async () => {


    try {


      const response = await api.get(

        `/products/${id}`

      );


      const product = response.data.product;



      setFormData({

        name: product.name,

        description: product.description,

        price: product.price,

        stock: product.stock,

        image: null

      });





      if(product.image){

        setPreview(

          `http://localhost:5000/uploads/${product.image}`

        );

      }



    } catch(error) {


      console.log(error);


    }


  };







  const handleChange = (e) => {


    const {name, value, files} = e.target;



    if(name === "image"){


      setFormData({

        ...formData,

        image: files[0]

      });



      setPreview(

        URL.createObjectURL(files[0])

      );



    } else {


      setFormData({

        ...formData,

        [name]: value

      });


    }


  };








  const handleSubmit = async(e)=>{


    e.preventDefault();


    setLoading(true);



    try{


      const data = new FormData();



      data.append(

        "name",

        formData.name

      );



      data.append(

        "description",

        formData.description

      );



      data.append(

        "price",

        formData.price

      );



      data.append(

        "stock",

        formData.stock

      );




      if(formData.image){


        data.append(

          "image",

          formData.image

        );


      }





      await api.put(

        `/products/${id}`,

        data,

        {

          headers:{

            "Content-Type":

            "multipart/form-data"

          }

        }

      );




      alert(

        "Product updated successfully!"

      );



      navigate("/admin");





    }catch(error){



      alert(

        error.response?.data?.message ||

        "Failed to update product."

      );



    }



    setLoading(false);


  };







  return (


    <div className="product-form-container">


      <form

        className="product-form"

        onSubmit={handleSubmit}

      >



        <h2>
          Edit Product
        </h2>





        <input

          type="text"

          name="name"

          placeholder="Product Name"

          value={formData.name}

          onChange={handleChange}

          required

        />





        <textarea

          name="description"

          rows="5"

          placeholder="Description"

          value={formData.description}

          onChange={handleChange}

          required

        />





        <input

          type="number"

          name="price"

          placeholder="Price"

          value={formData.price}

          onChange={handleChange}

          required

        />





        <input

          type="number"

          name="stock"

          placeholder="Stock"

          value={formData.stock}

          onChange={handleChange}

          required

        />






        <input

          type="file"

          name="image"

          accept="image/*"

          onChange={handleChange}

        />






        {preview && (

          <img

            src={preview}

            alt="Preview"

            className="preview-image"

          />

        )}






        <button

          type="submit"

          disabled={loading}

        >

          {

            loading

            ? "Updating..."

            : "Update Product"

          }


        </button>





      </form>



    </div>


  );

}


export default EditProduct;
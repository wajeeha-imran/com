import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);


  const [formData, setFormData] = useState({

    fullName: "",

    phone: "",

    address: "",

    city: "",

    postalCode: "",

    country: "",

    paymentMethod: "Cash on Delivery"

  });



  // Fetch cart items
  useEffect(() => {


    const fetchCart = async () => {

      try {

        const response = await api.get("/cart");


        setCartItems(

          response.data.cart.items || []

        );


      } catch(error) {

        console.log(error);

      }

    };


    fetchCart();


  }, []);





  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });


  };






  const placeOrder = async (e) => {

    e.preventDefault();


    if(cartItems.length === 0){

      alert("Your cart is empty");

      return;

    }


    setLoading(true);


    try {


      const orderData = {


        shippingAddress:{


          fullName: formData.fullName,

          phone: formData.phone,

          address: formData.address,

          city: formData.city,

          postalCode: formData.postalCode,

          country: formData.country


        },


        paymentMethod: formData.paymentMethod,



        items: cartItems.map((item)=>({


          productId:item.product.id,


          quantity:item.quantity,


          price:item.product.price,


          name:item.product.name


        }))


      };



      await api.post(

        "/orders",

        orderData

      );



      alert("Order placed successfully!");

      navigate("/orders");



    } catch(error) {


      console.log(error);


      alert(

        error.response?.data?.message ||

        "Failed to place order."

      );


    }


    setLoading(false);


  };





  return (


    <div className="checkout-container">


      <form

        className="checkout-form"

        onSubmit={placeOrder}

      >


        <h2>Checkout</h2>



        <input

          type="text"

          name="fullName"

          placeholder="Full Name"

          value={formData.fullName}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="phone"

          placeholder="Phone Number"

          value={formData.phone}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="address"

          placeholder="Address"

          value={formData.address}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="city"

          placeholder="City"

          value={formData.city}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="postalCode"

          placeholder="Postal Code"

          value={formData.postalCode}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="country"

          placeholder="Country"

          value={formData.country}

          onChange={handleChange}

          required

        />




        <label>

          Payment Method

        </label>



        <select

          name="paymentMethod"

          value={formData.paymentMethod}

          onChange={handleChange}

        >


          <option>

            Cash on Delivery

          </option>


          <option>

            Stripe

          </option>


          <option>

            PayPal

          </option>


        </select>




        <button

          type="submit"

          disabled={loading}

        >


          {

            loading

            ? "Placing Order..."

            : "Place Order"

          }


        </button>



      </form>


    </div>


  );

}


export default Checkout;
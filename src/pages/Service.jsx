 import React from "react";
import { useAuth } from "../store/auth";
import axios from 'axios';

import { toast } from "react-toastify";



export const Service = () => {

  
  const {  isLoggedIn,user,services } = useAuth();
  


  const isPaymentDone = (serviceId) => {
    const currentService = services.find((service) => service._id === serviceId);
    return currentService.payment.some((payment) => payment.email === user.email);
  };

  const handlePayment = async (serviceId) => {
    try {
      // Check if the user is logged in
      if (!isLoggedIn) {
        toast.error('Please log in to make a payment');
        // Optionally, redirect to the login page
        // You might have a routing library in your project for this purpose
        // Example with React Router: history.push('/login');
        return;
      }

      if (isPaymentDone(serviceId)) {
        console.log('Payment already done for this service');
        return;
      }

      console.log(serviceId);
      // Fetch Razorpay key
      const { data: { key } } = await axios.get("https://web-5sqp.onrender.com/api/getkey");

      // Create order on the server
      const orderResponse = await axios.post(
        'https://web-5sqp.onrender.com/api/checkoutservice',
        { serviceId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const order = orderResponse.data.order;

      const options = {
        key,
        amount: order.amount ,
        currency: "INR",
        name: "donate for good",
        description: "Tutorial of RazorPay",
        image: "",
        order_id: order.id,
        callback_url: `https://web-5sqp.onrender.com/api/paymentverification1/${encodeURIComponent(serviceId)}/${encodeURIComponent(user.email)}`,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#535bf2"
        }
      };

      // Create a new Razorpay instance
      const razor = new window.Razorpay(options);

      // Open Razorpay checkout form
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle errors as needed
    }
  };

  return (

    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {  
          services.map((curElem, index) => (
          <div className="card" key={index}>
            <div className="card-details">
              <div className="grid grid-two-cols">
                <p>{curElem.provider}</p>
                <p> RS/- {curElem.price}</p>
              </div>
              <h2>{curElem.service}</h2>
              <p>{curElem.description}</p>
             { (isLoggedIn) ?(
                (!isPaymentDone(curElem._id)) ? (
                <button onClick={() => handlePayment(curElem._id)}>Pay Now</button>
              ) : (
                <div className="payment-done">
                  <div className="card-iframe" dangerouslySetInnerHTML={{ __html: curElem.iframe }} />
                  
                </div>)
              ):<button onClick={() => handlePayment(curElem._id)} style={{ marginTop: '5rem' }}>
  Pay Now
</button>
}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
 
};

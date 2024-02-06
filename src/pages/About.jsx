import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const About = () => {
  const [customAmount, setCustomAmount] = useState(0);
  const handleAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };
  const checkoutHandler = async () => {
    

    
    try {
      // Fetch Razorpay key

      const { data: { key } } = await axios.get("https://web-5sqp.onrender.com/api/getkey");

      // Create order on the server
      const orderResponse = await axios.post("https://web-5sqp.onrender.com/api/checkout", { customAmount });
      console.log(orderResponse);
      const order = orderResponse.data.order;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "donate for good",
        description: "Tutorial of RazorPay",
        image: "",
        order_id: order.id,
        callback_url: "https://web-5sqp.onrender.com/api/paymentverification",
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

      // Use FormData to prevent circular structure issues
      const formData = new FormData();
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, value);
      });

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
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              {/* ... (other paragraphs) ... */}
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>registered companies</p>
          </div>
          <div className="div1">
            <h2>10000+</h2>
            <p>happy clients</p>
          </div>
          <div className="div1">
            <h2>500+</h2>
            <p>well known developers</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>service</p>
          </div>
        </div>
      </section>

      {/* Donation Card */}
      <section className="section-donate">
        <div className="container">
          <div className="donate-card">
            <h2>Support Our Mission</h2>
            <p>
              Your contribution helps us continue our mission of providing
              quality IT solutions. Donate now and be a part of our success
              story.
            </p>
            <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
  <input
    type="number"
    placeholder="Enter custom donation amount"
    value={customAmount}
    onChange={handleAmountChange}
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px',
      flex: '1',
    }}
  />
  <button
    className="btn donate-btn"
    onClick={checkoutHandler}
    style={{
      backgroundColor: '#535bf2',
      color: '#fff',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    Donate Now
  </button>
</div>

          </div>
        </div>
      </section>
    </>
  );
};

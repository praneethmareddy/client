import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  
  const { user } = useAuth();

  console.log("frontend user ", user.email);
  const [userData, setUserData] = useState(true);
  if (userData && user) {
    console.log(user);
    setContact({
 
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://web-5sqp.onrender.com/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      console.log("response: ", response);
      // alert(response);

      if (response.ok) {
        setContact(defaultContactFormData);
        const responseData = await response.json();
        toast.success(responseData.message);
        console.log(responseData);
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.795188821359!2d81.66056017410845!3d16.737068021215745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37c82405546f71%3A0x2b8a214c18cd2ba0!2sMandapaka%20Ellaramma%20Ammavari%20Temple!5e0!3m2!1sen!2sin!4v1707148885880!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`https://web-5sqp.onrender.com/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // defining the funciton deleteContactById

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`https://web-5sqp.onrender.com/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
<section className="admin-contacts-section">
  <div className="container">
    <h1>Admin Contact Data</h1>
  </div>

  <div className="container admin-contacts">
    {contactData.map((curContactData, index) => {
      const { username, email, message, _id } = curContactData;

      return (
        <div key={index} className="contact-item">
          <div className="label">Name:</div>
          <div className="value">{username}</div>

          <div className="label">Email:</div>
          <div className="value">{email}</div>

          <div className="label">Message:</div>
          <div className="value">{message}</div>

          <div className="label"></div>
          <div className="value">
            <button className="btn btn-custom" onClick={() => deleteContactById(_id)}>
              Delete
            </button>
          </div>
        </div>
      );
    })}
  </div>
</section>




    </>
  );
};

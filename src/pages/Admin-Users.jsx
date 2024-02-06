import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken, API } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`https://web-5sqp.onrender.com/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   delelte the user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://web-5sqp.onrender.com/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users after delete:  ${data}`);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
<section className="user-admin-section">
  <div className="user-container">
    <h1>User Admin Data</h1>
  </div>
  <div className="user-container user-admin-users grid-wrapper">
    {users.map((curUser, index) => (
      <div key={index} className="user-box user-zone">
        <div className="user-label">Name:</div>
        <div className="user-value">{curUser.username}</div>

        <div className="user-label">Email:</div>
        <div className="user-value">{curUser.email}</div>

        <div className="user-label">Phone:</div>
        <div className="user-value">{curUser.phone}</div>

        <div className="user-label"></div>
        <div className="user-value">
          <Link to={`/admin/users/${curUser._id}/edit`} className="user-btn-custom ">
            Edit
          </Link>
          <button className="user-btn-custom" onClick={() => deleteUser(curUser._id)}>
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

    </>
  );
};

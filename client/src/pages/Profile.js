import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';

function Profile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  const [deleteUser] = useMutation(DELETE_USER);

  const deleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      var id = data.user._id;
      const mutationResponse = await deleteUser({
        variables: {
          id
        },
      }).then((result) => {
        if (result.data.deleteUser) {
          alert("Your account has been deleted. Please come back to do business!")
          Auth.logout();
        }
      }).catch((error) => {
        alert("There was an error deleting your profile");
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="background-image"></div>
      <div className="content-container">
        {user ? (
          <>
            <h1>User Profile</h1>
            <div>First Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
            <div>Email: {user.email}</div>
            <br />
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              I want to <button onClick={deleteHandler} id={`${user._id}`}>Delete</button> my account
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;


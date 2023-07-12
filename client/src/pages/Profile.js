import React, { useState } from 'react';
import {useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';

function Profile() {
  // Fetch the user data from the server
  const { data } = useQuery(QUERY_USER);
  let user;

  // Set the user data if it exists
  if (data) {
    user = data.user;
  }

    // Define the delete user mutation
  const [deleteUser] = useMutation(DELETE_USER);

  // Handle the delete button click event
  const deleteHandler = async (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete your account?") == true){
      var id = data.user._id;
          // Perform the delete user mutation
      const mutationResponse = await deleteUser({
        variables: {
          id
        },
      }).then((result)=>{
        if(result.data.deleteUser){
          // Display a success message and log out the user
          alert("Your account has been deleted. Please come back to do business!")
          Auth.logout();
        }
      }).catch((error)=>{
        // Display an error message if there was an issue deleting the profile
        alert("There was an error deleting your profile");
      });
    }
  };

  return (
    <>
      <div className="container my-1">
        {user ? (
          <>
            <h2>
              User Profile
            </h2>
            <div>First Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
            <div>Email: {user.email}</div>
            <br/>
            <div> I want to <button onClick={deleteHandler} id={`${user._id}`}> Delete </button> my account</div>
          </>
        ) : null}
      </div>
    </>
  );
}
export default Profile;
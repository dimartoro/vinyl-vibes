import {useQuery, useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';


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
    if (window.confirm("Are you sure you want to delete your account?")) {
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
    <div className="profile-container">
      <div className="background-image"></div>
      <div className="content-container">
        {user ? (
          <>
            <h1>User Profile</h1>
            <div>First Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
            <div>Email: {user.email}</div>
            <br/>
            <br/>
            <div> I want to <button onClick={deleteHandler} id={`${user._id}`}> Delete </button> my account</div>
            <br/>
            <h2>Saved Orders</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  
                  {order.albums.map(({ _id, imageFront, title, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/albums/${_id}`}>
                        <img alt={title} src={`/images/${imageFront}`} />
                        <p>{title}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;


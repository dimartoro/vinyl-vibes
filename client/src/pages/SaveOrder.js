import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function SaveOrder() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      // Retrieve cart items from IndexedDB
      const cart = await idbPromise('cart', 'get');
      const albums = cart.map((item) => item._id);
      if (albums.length) {
        // Add order using the addOrder mutation
        const { data } = await addOrder({ variables: { albums } });
        const albumData = data.addOrder.albums;

        // Remove ordered items from cart in IndexedDB
        albumData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // Redirect to the home page after a delay
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }
    // Call saveOrder function when the component mounts
    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Your Order was saved Successfully!</h1>
      </Jumbotron>
    </div>
  );
}

export default SaveOrder;

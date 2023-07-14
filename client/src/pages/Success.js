import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
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

        albumData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // Redirect to the home page after a delay
      setTimeout(() => {
        window.location.assign('/');
      }, 1000);
    }
    // Call saveOrder function when the component mounts
    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;

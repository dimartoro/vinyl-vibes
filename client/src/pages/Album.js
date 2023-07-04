import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
  UPDATE_ALBUMS
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { QUERY_ALBUMS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Album() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentAlbum, setCurrentAlbum] = useState({});

  const { loading, data } = useQuery(QUERY_ALBUMS);

  const { albums, cart } = state;
  
  useEffect(() => {
    // already in global store
    if (albums.length) {
      setCurrentAlbum(albums.find((album) => album._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_ALBUMS,
        albums: data.albums,
      });

      data.albums.forEach((album) => {
        idbPromise('album', 'put', album);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('albums', 'get').then((indexedAlbums) => {
        dispatch({
          type: UPDATE_ALBUMS,
          albums: indexedAlbums,
        });
      });
    }
  }, [albums, data, loading, dispatch, id]);

  const addToCart = () => {
    console.log("CURRENT ALBUM::::", currentAlbum);
    debugger;
    const tempAlbum = {...currentAlbum};
    console.log("TEMP ALBUM::::", tempAlbum);
    tempAlbum.name = tempAlbum.title;
    console.log("TEMP ALBUM::::", tempAlbum);
    tempAlbum.image = tempAlbum.imageFront;
    console.log("TEMP ALBUM::::", tempAlbum);
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        album: { ...tempAlbum, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...tempAlbum, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentAlbum._id,
    });

    idbPromise('cart', 'delete', { ...currentAlbum });
  };

  return (
    <>
      {currentAlbum && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Albums</Link>

          <h2>{currentAlbum.title}</h2>

          <p>{currentAlbum.description}</p>

          <p>
            <strong>Price:</strong>${currentAlbum.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentAlbum._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentAlbum.imageFront}`}
            alt={currentAlbum.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Album;

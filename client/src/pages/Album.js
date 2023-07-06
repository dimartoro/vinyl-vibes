import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_ALBUMS
} from '../utils/actions';
import { QUERY_ALBUMS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import AlbumTracks from '../components/AlbumTracks';

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
      console.log("CURRENT ALBUM:::", currentAlbum);
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_ALBUMS,
        albums: data.albums,
      });
      console.log("ALBUMS::::", data.albums);
      data.albums.forEach((album) => {
        idbPromise('albums', 'put', album);
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
      {currentAlbum && currentAlbum.sideATracks && currentAlbum.sideBTracks && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Albums</Link>
          <br/>
          <br/>
          <h2>{currentAlbum.artist} - {currentAlbum.title}</h2>
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
          <div className='album-images'>
            <div className='card'>
              <img
              className='album-detail'
              src={`/images/${currentAlbum.imageFront}`}
              alt={currentAlbum.name}/>
            </div>
            <div className='card'>
            <img
              className='album-detail'
              src={`/images/${currentAlbum.imageBack}`}
              alt={currentAlbum.name}/>
            </div>
          </div>
          <div className='album-images'>
            <div>
              <h3>Side A Tracks</h3>
                <AlbumTracks side='A' tracks={currentAlbum.sideATracks}/>
              </div>
              <div>
                <h3>Side B Tracks</h3>
                <AlbumTracks side='B' tracks={currentAlbum.sideBTracks}/>
              </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Album;

import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import AlbumItem from '../AlbumItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS, UPDATE_ALBUMS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_ALBUMS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function AlbumList() {
  const [state, dispatch] = useStoreContext();

  const { currentGenre } = state;
  console.log("CURRENTE GENRE", currentGenre);
  const { loading, data } = useQuery(QUERY_ALBUMS);

  console.log("LOADING::::", loading);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ALBUMS,
        albums: data.albums,
      });
      data.albums.forEach((album) => {
        idbPromise('albums', 'put', album);
      });
    } else if (!loading) {
      console.log("LOADING AGAIN::::", loading);
      idbPromise('albums', 'get').then((albums) => {
        dispatch({
          type: UPDATE_ALBUMS,
          albums: albums,
        });
      });
    }
  }, [data, loading, dispatch]);


  function filterAlbums() {
    if (!currentGenre) {
      return state.albums;
    }
    console.log("ALBUMS:::", state.albums);
    return state.albums.filter(
      (album) => album.genre._id === currentGenre
    );
  }

  return (
    <>
      <div className="my-2">
        <h2>Our Albums:</h2>
        {state.albums.length ? (
          <div className="flex-row">
            {filterAlbums().map((album) => (
              <AlbumItem
                key={album._id}
                _id={album._id}
                name={album.title}
                image={album.imageFront}
                price={album.price}
                quantity={album.quantity}
              />
            ))}
          </div>
        ) : (
          <h3>You haven't added any albums yet!</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </div>
    </>
  );
}

export default AlbumList;

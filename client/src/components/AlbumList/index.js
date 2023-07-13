import React, { useEffect } from 'react';
import AlbumItem from '../AlbumItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_ALBUMS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUMS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function AlbumList() {
  const [state, dispatch] = useStoreContext();

  const { currentGenre } = state;
  const { loading, data } = useQuery(QUERY_ALBUMS);

  useEffect(() => {
    if (data) {
      // If data is available, update the albums in the global state
      dispatch({
        type: UPDATE_ALBUMS,
        albums: data.albums,
      });
      //store each album in indexedDB
      data.albums.forEach((album) => {
        idbPromise('albums', 'put', album);
      });
    } else if (!loading) {
      
  //If the data is not available and loading is false, retrieve album from IndexeDB
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
      //If no genre has been selected, return all albums
      return state.albums;
    }
    //Filter albums based on the current genre
    return state.albums.filter(
      (album) => album.genre._id === currentGenre
    );
  }

  return (
    <>
      <div className="albums-display my-2">
        <h2>Check all available albums</h2>
        {state.albums.length ? (
          <div className="flex-row">
            {filterAlbums().map((album) => (
              <AlbumItem
                key={album._id}
                _id={album._id}
                name={album.title}
                artist={album.artist}
                image={album.imageFront}
                imageBack={album.imageBack}
                price={album.price}
                quantity={album.quantity}
                label={album.label}
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

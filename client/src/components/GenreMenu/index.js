import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {  UPDATE_GENRES, UPDATE_CURRENT_GENRE } from '../../utils/actions';
import { QUERY_GENRES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function GenreMenu() {
  const [state, dispatch] = useStoreContext();
  const { genres } = state;
  const { loading, data: genreData } = useQuery(QUERY_GENRES);

  useEffect(() => {
    if (genreData) {
      // If genreData is available, update the genres in the global state
      dispatch({
        type: UPDATE_GENRES,
        genres: genreData.genres,
      });

      // Store each genre in IndexedDB
      genreData.genres.forEach((genre) => {
        idbPromise('genres', 'put', genre);
      });
    } else if (!loading) {
      // If genreData is not available and loading is false, retrieve genres from IndexedDB
      idbPromise('genres', 'get').then((genres) => {
        dispatch({
          type: UPDATE_GENRES,
          genres: genres,
        });
      });
    }
  }, [dispatch, loading, genreData]);

  const handleClick = (id) => {
    // Set the current genre in the global state
    dispatch({
      type: UPDATE_CURRENT_GENRE,
      currentGenre: id,
    });
  };

  return (
    <>
      <div className='genre-menu'>
        <h2>Filter by Genre</h2>
        {genres.map((item) => (
          // Render a button for each genre
          <button
            className='add-filter'
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        ))}
        <button
          className='clear-filter'
          onClick={() => {
            handleClick('');
          }}
        >
          Clear filters
        </button>
      </div>
    </>
  );
}

export default GenreMenu;

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {  UPDATE_CATEGORIES,  UPDATE_CURRENT_CATEGORY, UPDATE_GENRES,  UPDATE_CURRENT_GENRE} from '../../utils/actions';
import { QUERY_CATEGORIES, QUERY_GENRES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function GenreMenu() {
  const [state, dispatch] = useStoreContext();
  const { genres } = state;
  const { loading, data: genreData } = useQuery(QUERY_GENRES);

  useEffect(() => {
    if (genreData) {
      console.log("GENREDATA:::", genreData);
      dispatch({
        type: UPDATE_GENRES,
        genres: genreData.genres,
      });
      genreData.genres.forEach((genre) => {
        console.log("GENRE::::", genre);
        idbPromise('genres', 'put', genre);
      });
    } else if (!loading) {
      idbPromise('genres', 'get').then((genres) => {
        dispatch({
          type: UPDATE_GENRES,
          genres: genres,
        });
      });
    }
  }, [dispatch,loading, genreData]);
  
  
  const handleClick = (id) => {
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
          <button className='add-filter'
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        ))}
        <button className='clear-filter'
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

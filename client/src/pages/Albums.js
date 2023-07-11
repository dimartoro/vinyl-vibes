import React from "react";
import AlbumList from "../components/AlbumList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Albums = () => {
  return (
    <div className="container">
      <GenreMenu /> {/* Render the genre menu component */}
      <AlbumList /> {/* Render the album list component */}
      <Cart /> {/* Render the cart component */}
    </div>
  );
};

export default Albums;

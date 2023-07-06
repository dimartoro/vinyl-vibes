import React from "react";
import AlbumList from "../components/AlbumList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Albums = () => {
  return (
    <div className="container">
      <GenreMenu />
      <AlbumList/>
      <Cart />
    </div>
  );
};

export default Albums;

import React from "react";
import ProductList from "../components/ProductList";
import AlbumList from "../components/AlbumList";
import CategoryMenu from "../components/CategoryMenu";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Albums = () => {
  return (
    <div className="container">
      <h1>I AM ALBUMS</h1>
      <GenreMenu />
      <AlbumList/>
      <Cart />
    </div>
  );
};

export default Albums;

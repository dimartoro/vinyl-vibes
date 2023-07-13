import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function AlbumItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity,
    artist
  } = item;

  const { cart } = state;

  const addToCart = () => {
    // Check if the item is already in the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    
    if (itemInCart) {
      // If the item is already in the cart, update its quantity
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });

      // Update the item quantity in IndexedDB
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // If the item is not in the cart, add it to the cart
      dispatch({
        type: ADD_TO_CART,
        album: { ...item, purchaseQuantity: 1 }
      });

      // Add the item to IndexedDB with a quantity of 1
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <div className="artist">{artist}</div>
      <Link to={`/albums/${_id}`}>
        <div className ="rotate">
        <img
          alt={name}
          src={`/images/${image}`}
        />
        </div>
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default AlbumItem;

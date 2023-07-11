import { gql } from '@apollo/client';


export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;
// Query for retrieving albums. Can filter by genre ID. Returns album details including ID, title, artist, description, price, quantity, images, tracks, label, and genre ID.
export const QUERY_ALBUMS = gql`
  query getAlbums($genre: ID) {
    albums(genre: $genre) {
      _id
      title
      artist
      description
      price
      quantity
      imageFront
      imageBack
      sideATracks
      sideBTracks
      label
      genre {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

//Pending to create QUERY_ALL_ALBUMS
export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;
// Query for retrieving genres. Returns genre details including ID and name.
export const QUERY_GENRES = gql`
  {
    genres {
      _id
      name
    }
  }
`;

// Query for retrieving user information. Returns user details including ID, email, first name, last name, and order history with product details.
export const QUERY_USER = gql`
  {
    user {
      _id
      email
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

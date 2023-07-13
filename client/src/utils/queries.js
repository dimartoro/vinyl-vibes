import { gql } from '@apollo/client';

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
  query getCheckout($albums: [ID]!) {
    checkout(albums: $albums) {
      session
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

// Query for retrieving user information. Returns user details including ID, email, first name, last name.
export const QUERY_USER = gql`
  {
    user {
      _id
      email
      firstName
      lastName
      orders{
        _id
        purchaseDate
        albums {
          _id
          title
          description
          price
          quantity
          imageFront
        }
      }
    }
  }
`;

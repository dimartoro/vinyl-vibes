import { gql } from '@apollo/client';

// Mutation for user login. Requires email and password parameters. Returns token and user ID.
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
// Mutation for adding an order. Requires an array of album IDs. Returns purchase date and detailed album information.
export const ADD_ORDER = gql`
  mutation addOrder($albums: [ID]!) {
    addOrder(albums: $albums) {
      purchaseDate
      albums {
        _id
      }
    }
  }
`;
// Mutation for deleting a user. Requires the user ID parameter.
export const DELETE_USER = gql`
  mutation deleteUser($id:ID) {
    deleteUser(_id:$id)
  }
`;


// Mutation for adding a user. Requires first name, last name, email, and password parameters. Returns token and user ID.
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

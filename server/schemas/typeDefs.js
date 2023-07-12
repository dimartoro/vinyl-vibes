const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Order {
    _id: ID
    purchaseDate: String
    albums: [Album]
  }

  type Genre {
    _id: ID
    name: String
  }

  type Album {
    _id: ID!
    title: String!
    description: String
    label: String
    artist: String
    imageFront: String
    imageBack: String
    price: Float!
    quantity: Int!
    genre: Genre!
    sideATracks: [String!]!
    sideBTracks: [String!]!
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type SaveOrder {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    order(_id: ID!): Order
    checkout(albums: [ID]!): Checkout
    genres: [Genre]
    albums(genre: ID): [Album]
    album(_id: ID!): Album
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(_id: ID): Boolean
    login(email: String!, password: String!): Auth
    addOrder(albums: [ID]!): Order
    updateAlbum(_id: ID!, quantity: Int!): Album
  }
`;

module.exports = typeDefs;

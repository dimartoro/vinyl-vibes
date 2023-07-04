const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Genre {
    _id: ID!
    name: String!
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
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    genres: [Genre]
    albums(genre: ID): [Album]
    album(_id: ID!): Album
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addAlbumOrder(albums: [ID]!): Order
    updateAlbum(_id: ID!, quantity: Int!): Album
  }
`;

module.exports = typeDefs;

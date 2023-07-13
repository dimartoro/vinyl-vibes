const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Album, Genre } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.albums',
          populate: 'genre'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.albums',
          populate: 'genre'
        });
        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ albums: args.albums });
      const line_items = [];

      const { albums } = await order.populate('albums');

      for (let i = 0; i < albums.length; i++) {
        const album = await stripe.albums.create({
          title: albums[i].name,
          description: albums[i].description,
          imageFront: [`${url}/images/${albums[i].image}`]
        });

        const price = await stripe.prices.create({
          album: album.id,
          unit_amount: albums[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
    genres: async () => {
      return await Genre.find();
    },
    albums: async (parent, { genre }) => {
      const params = {};

      if (genre) {
        params.genre = genre;
      }
      return await Album.find(params).populate('genre');
    },
    album: async (parent, { _id }) => {
      const album = await Album.findById(_id).populate('genre');
      return album;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (_,{_id}, context) => {
      if (context.user) {
        var removed = await User.findByIdAndRemove(context.user._id);
        return removed?true:false;
      }
      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { albums }, context) => {
      if (context.user) {
        try{
        // const order = new Order({ albums });
        const order = await Order.create({ albums });
        const user = await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        return order;
        }catch(err){
          console.log("THERE IS AN ERROR", err);
        }
        return {};
      }

      throw new AuthenticationError('Not logged in');
    },
    updateAlbum: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Album.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
  }
};

module.exports = resolvers;

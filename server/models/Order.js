const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a new orderSchema using the Schema constructor
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Album'
    }
  ]
});

// Create the 'Order' model using the orderSchema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

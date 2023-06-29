const mongoose = require('mongoose');

const { Schema } = mongoose;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  label: {
    type: String
  },
  artist: {
    type: String
  },
  imageFront: {
    type: String
  },
  imageBack: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  sideATracks: {type:Array, default:[]},
  sideBTracks: {type: Array, default:[]}
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;

const mongoose = require('mongoose');

const { Schema } = mongoose;
// Create a new genreSchema using the Schema constructor
const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;

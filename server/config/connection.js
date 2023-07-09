const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vinyl-vibes');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dimartoro:Calvin28@cluster0.lmd4gqk.mongodb.net/vinyl-vibes');

module.exports = mongoose.connection;

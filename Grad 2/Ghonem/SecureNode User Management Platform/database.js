const dotenv = require('dotenv')
dotenv.config(); 
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // Connected successfully!
  console.log('Connected to MongoDB');
});


module.exports = mongoose;
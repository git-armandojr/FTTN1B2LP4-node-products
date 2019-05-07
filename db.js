var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ftt', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

var productSchema = new mongoose.Schema({
    type: String,
    brand: String,
    price: Number
}, { collection: 'products' });

module.exports = { Mongoose: mongoose, ProductSchema: productSchema }
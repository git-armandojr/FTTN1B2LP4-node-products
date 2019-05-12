var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all products. */
router.get('/products', function (req, res, next) {
  var db = require('../db');
  var Product = db.Mongoose.model('products', db.ProductSchema, 'products');
  Product.find({}).lean().exec(function(e,docs){
     res.json(docs);
     res.end();
  });
});

/* GET product by id. */
router.get('/products/:id', function (req, res, next) {
  var db = require('../db');
  var Product = db.Mongoose.model('products', db.ProductSchema, 'products');
  Product.findById({ _id: req.params.id }).lean().exec(function (e, docs) {
      res.json(docs);
      res.end();
  });
});

/* POST ONE product. */
router.post('/products/', function (req, res, next) {
  var db = require('../db');
  var Product = db.Mongoose.model('products', db.ProductSchema, 'products');
  var newproduct = new Product({ type: req.body.type, brand: req.body.brand, price: req.body.price });
  newproduct.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newproduct);
      res.end();
  });
});

/* PUT ONE product. */
router.put('/products/:id', function (req, res, next) {
    var db = require('../db');
    var Product = db.Mongoose.model('products', db.ProductSchema, 'products');
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
        res.end();
    });
});

/* DELETE ONE product. */
router.delete('/products/:id', function (req, res, next) {
  var db = require('../db');
  var Product = db.Mongoose.model('products', db.ProductSchema, 'products');
  Product.findByIdAndDelete({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});

module.exports = router;

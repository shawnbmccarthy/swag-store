const Product = require('./models/product');
const User = require('./models/user');
const mongoose = require('mongoose');
const faker = require('faker');
const dotenv = require('dotenv');
const async = require('async');
const winston = require("winston");

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'swagstore.log' })
    ]
});

mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://localhost:27017/swag-store";
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', () => {
	logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

brands = ['MongoDB', 'American Apparel', 'Hanes', 'Timbuk2','Nathan', 'Blank'];
fabrics = ['Wool', 'Neoprene', 'Fleece', 'Hemp', 'Mesh', 'Woven'];
types = ['Pullover', 'Tee-shirt', 'Baseball Tee', 'Running Jacket', 'Vest'];
categories = ['travel','accessories','bags','hoodies','kids','marmont','vests','vintage']
var category = 'Apparel';
var done = 0;

const howManyProducts = 100;
async.times(howManyProducts, function(i, next) {
    var categoryItems = [];
    categoryItems["travel"] = ['Travel Plug','Travel Pillow','Wallet','Toiletry Organizer','Phone Charger'];
    categoryItems["accessories"] = ['Luggage Tag','Scarf Pocket','Jewelry Organizer']
    categoryItems["bags"] = ['Drawstring Bag','Duffel Bag','Weekender','Spinner'];
    categoryItems["hoodies"] = ['Zippered Hoodie','Pullover','Runner','Buttoned Hoodie'];
    categoryItems["kids"] = ['Sippy Cup','Sunglasses','Umbrella','Onesie'];
    categoryItems["marmont"] = ['Vest','Headband','Tee Shirt','Eye Shade'];
    categoryItems["vests"] = ['Marmont','Puffy Vest','Fleece','Hooded Vest'];
    categoryItems["vintage"] = ['Tee Shirt','Baseball Tee','Hoodie','Mug']

    typeNum = Math.floor((Math.random() * types.length - 1) + 1);
    brandNum = Math.floor((Math.random() * brands.length - 1) + 1);
    fabricNum = Math.floor((Math.random() * fabrics.length - 1) + 1);
    type = types[typeNum];
    fabric = fabrics[fabricNum];
    brand = brands[brandNum];
    categoryNum = Math.floor((Math.random() * categories.length - 1) + 1);
    category = categories[categoryNum];
    console.log("Category " + category + ", CategoryNum: " + categoryNum);
    categoryItemNum = Math.floor((Math.random() * categoryItems[category].length - 1) + 1);
    name = brand + ' ' + fabric + ' ' + categoryItems[category][categoryItemNum];
    price = Math.floor((Math.random() * 10000 - 1) + 1);
    cost = Math.floor((Math.random() * price) + (price / 2));
    product = new Product({
        name: name,
        inventory: Math.floor((Math.random() * 1000 - 1) + 1),
        price: price,
        cost: cost,
        category: category,
        image: {
            large: '/images/leaf_large.png',
            thumb: '/images/leaf_thumb.png'
        }
    });
    console.log(JSON.stringify(product));
    product.save(function(err, productId) {
        if (err) {
            console.log('error: ', err.message);
        }

        done++;
        if (done == howManyProducts) {
            exit();
        }
    });

});

function exit() {
	mongoose.disconnect();
}
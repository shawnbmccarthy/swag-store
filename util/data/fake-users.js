const Product = require('./models/product');
const User = require('./models/user');
const mongoose = require('mongoose');
const faker = require('faker');
const dotenv = require('dotenv');
const async = require('async');
const winston = require("winston");
const random = require('mongoose-simple-random');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'swagstore.log' })
    ]
});

"use strict";

mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://localhost:27017/swag-store";
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', () => {
	logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

const maxUsers = 20;
var done=0;
const startDate = new Date(2015, 0, 1)
const endDate = new Date()
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
for (var i=0; i < maxUsers; i++) {
	var filter = {};
	var fields = { _id: 1, id: 1, name: 1 };
	var options = { skip: 10, limit: 10, count: 5 }
	var address = faker.address.streetAddress();
	var city = faker.address.city();
	var state = faker.address.stateAbbr();
	var zip = faker.address.zipCode();
	Product.findRandom(filter, fields, options, function(err,productArray) {
		if (err) {
			console.log(err);
		}
        
		user = new User({
			firstname: faker.name.firstName(),
			lastname: faker.name.lastName(),
			email: faker.internet.email(),
			address: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.stateAbbr(),
			zip: faker.address.zipCode(),
			phone: faker.phone.phoneNumber(),
			role: 'customer',
            created: Date.now(),
		},function(err,doc) {
			if (err) {
				console.log('error: ' + err);
			}
		});
		user.save(function(err,newuser) {
			if (err) {
				console.log('error: ',err.message);
			}
            
			done++;
			if (done>=maxUsers) {
				exit();
			}
		});
	});
}

function exit() {
	mongoose.disconnect();
	exit;
}
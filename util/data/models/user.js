var mongoose = require("mongoose");
var random = require('mongoose-simple-random');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
		required: false
    },	
    user_id: {
		type: String,
		required: false
    },
    gcpId: {
		type: String,
		required: false
	},
	firstname: {
		type: String,
		required: false
	},
	lastname: {
		type: String,
		required: false
    },
    address_type: {
		type: String,
		required: false
    },
	address: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	state: {
		type: String,
		required: false
	},
	zip: {
		type: String,
		required: false
	},
	phone: {
		type: String,
		required: false
	},
	role: {
		type: String,
		required: false
    },
    admin: {
        type: Boolean,
        required: false
    },
    notify: {
        type: Array,
        required: false
    },
	acceptedTOS: {
		type: Date
    },
	personalized_recs: {
        type: Object,
        required: false
    },
    browsed_products: {
        type: Array,
        required: false
    },
    orders: {
        type: Object,
        required: false
    },
	created: {
		type: Date, default: Date.now()
	},
	lastlogin: {
		type: Date, default: Date.now()
	},
});

userSchema.plugin(random);

module.exports = mongoose.model('User', userSchema);
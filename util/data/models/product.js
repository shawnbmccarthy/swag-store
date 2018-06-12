var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    inventory: {
        onHand: Number,
        disableAtZero: Boolean
    },
    sku: String,
    image: {
        type: Object,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    sizes: {
        type: Array,
        required: false
    },
    inventory: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    tweets: {
        type: Number,
        required: false
    },
    reviews: {
        type: Array,
        required: false
    },
    sale_attributes: {
        type: Object, required: false
    },
    category: {
        type: Array,
        required: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    update: {
        type: Date,
        default: Date.now()
    },
    soldCount: {
        type: Number
    },
    sku: {
        type: String
    }
});

// schema.index({ name: 'text', category: 'text' });

schema.plugin(random);

module.exports = mongoose.model('Product', schema);
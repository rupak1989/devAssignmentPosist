var mongoose = require('mongoose');

var item = {
    name: String,
    quantity: Number,
    rate: Number
};

module.exports = mongoose.model('Bill', {
    billNo: Number,
    billDate: {type : Date},
    items: [item],
    discount: Number,
    tax: Number,
    customerId: String

});

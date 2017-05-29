var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address = {
    flat : String,
    street : String,
    state : String,
    pin : String
};

var customerSchema = new Schema({
    name : String,
    mobile : String,
    phone : String,
    addresses : [address],
    dob : { type : Date},
    email : String
});

customerSchema.index({addresses: 'text', dob : 'text'});

module.exports =  mongoose.model('Customer', customerSchema);
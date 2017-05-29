/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : generating dummy customer &  bill 
 * *************************************************************** */

var mongoose = require('mongoose');
var customerModel = require('./datasets/customer');
var billModel = require('./datasets/bill');

module.exports.generateCustomerAndBill = function () {


    var data = [];
    var customers = [];

    function getRandomDate(){

        var day = Math.floor((Math.random() * 31)+1);
        var month = Math.floor((Math.random() * 12)+1);
        var year = '20'+Math.floor((Math.random() * 17)+1);
        return new Date(year, month, day)

    }

    function getItems(){

        var items = [],
            length = Math.floor((Math.random() * 10) + 1),

            //unable to understand that is quantity is common for all item or not so i am assuming it common for all items
            quantity  = length;

        for(var j=0; j < length; j++){

            items[j] = {
                name : 'item'+j,
                quantity : quantity,
                rate : ((Math.random() * 5) + 1).toFixed(2)
            }

        }

        return items;

    }

    function getAddresses(i){

        var addresses = [];
        var length = Math.floor((Math.random() * 3) + 1);
        for(var j=0; j<length;j++){

            addresses[j] = {
                flat : 'flat no '+(j+1),
                street : (i+1)+' main '+(j+1)+' cross road',
                state : 'state'+j,
                pin : Math.floor((Math.random() * 100000) + 1)
            }

        }

        return addresses;

    }



    customerModel.remove({}, function () {

        for(var i=0; i < 100; i++){
            customers[i] = {
                name : 'customer'+i,
                mobile : '99'+Math.floor((Math.random() * 9)+1)+'548381'+Math.floor((Math.random() * 9)+1),
                phone : '22'+Math.floor((Math.random() * 9)+1)+'3'+Math.floor((Math.random() * 9)+1),
                addresses : getAddresses(i),
                // dob : new Date(),
                dob : getRandomDate(),
                email: 'customer'+i+'@gmail.com'
            }
        }

        customerModel.insertMany(customers, function (err, res) {
            console.log('customer inserted in db : ', res.length)
            customers = res;
        });

    });



    billModel.remove({}, function () {

        var index = 0;
        for(var i=0; i < 1000; i++){

            if((i+1)%10 == 0 && (i+1)< 1000){
                // console.log('index is : ', index, i);
                index++;
            }

            data[i] = {
                billNo : '00'+i,
                billDate : new Date(),
                items : getItems(),
                discount : Math.floor((Math.random() * 20)+1),
                tax : Math.floor((Math.random() * 10)+1),
                customerId : customers[index]._id
            }

        }



        billModel.insertMany(data, function (err, res) {

            console.log(' bills inserted in db: ', res.length);

        });


    });



    
}

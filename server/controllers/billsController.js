/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Query customer related bills 
 * *************************************************************** */

var Customer = require('../datasets/customer');
var Bills = require('../datasets/bill');


var itemPerPage = 5;

module.exports.find = function (req, res) {


    // console.log('the request data is : ', req, req.body.id);

    var query = req.query;
    if (query && query.page) {

        var skip = query.page * itemPerPage;
        delete query.page;

    }

    var queryData = query ? req.query : {};

    console.log(queryData, req.query);
    var customer = Bills.find(queryData).find().skip(skip).limit(itemPerPage);
    customer.exec(function (err, bills) {

        if (!err) {
            res.send(bills);
        }
    })


};
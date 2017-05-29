/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Query according to user details 
 * *************************************************************** */
var Customer = require('../datasets/customer');
var Bills = require('../datasets/bill');

module.exports.createUser = function (req, res) {
    console.log('the request data is : ', req.body);

    var customer = new Customer(req.body);
    customer.save(function (err, data) {


        console.log(' created customer : ', data);
        if (!err) {
            res.json(data);
        }

    });

}

module.exports.updateUser = function (req, res) {
    console.log('the request data is : ', req.body);

    var data = req.body;

    Customer.findByIdAndUpdate(data._id, data, {new: true}, function (err, resData) {

        if (!err) {


            res.send(resData);


        }
        else {
            res.send(err);
        }
    });

    console.log(' it worked ? ');


};

function setData(data, res) {


    Customer.findByIdAndUpdate(data._id, {$set: data}, {new: true}, function (err, resData2) {

        if (!err) {

            res.send(resData2);

        }


    })

}


module.exports.findCustomer = function (req, res) {


    var id = req.params.userId;
    console.log(' user id is : ', id);

    var report = {};
    Customer.findById(id, function (err, customer) {

        if (!err) {

            res.send(customer)


        }

    });


}

var itemPerPage = 5;
module.exports.find = function (req, res) {


    // console.log('the request data is : ', req, req.body.id);

    var query = req.query;
    if (query && query.page) {

        var skip = query.page * itemPerPage;
        delete query.page;

    }

    var queryData = query ? query : {};

    console.log(queryData, req.query);

    if (queryData) {

        for (var key in queryData) {

            if (key !== 'dob' && key !== 'addresses') {
                
                queryData[key] = new RegExp(queryData[key], 'i');
                
            } else {

                queryData = {
                    $text : {
                        $search : queryData[key]
                    }
                };

            }

        }

        console.log(' edit query is =========> ', queryData);

    }

    var customer = Customer.find(queryData).skip(skip).limit(itemPerPage);
    customer.exec(function (err, customer) {

        if (!err) {
            res.send(customer);
        } else {
            res.send(err);
        }
    })


};


module.exports.getReport = function (req, res) {

    var id = req.params.userId;
    console.log(' user id is : ', id);

    var report = {};
    Customer.findById(id, function (err, customer) {

        if (!err) {

            console.log(' customer is : ', customer);
            var user = {
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                phone: customer.phone
            }

            report.customer = user;

            Bills.find({customerId: id}, function (err2, bills) {

                if (!err2) {
                    report.bills = bills;
                    res.send(report);
                }


            })


        }

    });


}

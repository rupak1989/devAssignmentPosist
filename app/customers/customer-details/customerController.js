/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Customer Controller for frontent 
 * *************************************************************** */
app.controller('customer-controller', function ($scope, $http, $routeParams) {

    $http.get('/customer/' + $routeParams.id + '/get').then(function (res) {

        $scope.customer = res.data;
        console.log(res.data);

    });


    function getAmount(bills) {

        // var x = bills;
        console.log('bill is : ', x, bills);
        var total = 0;

        for (var z = 0; z < bills.length; z++) {

            var x = bills[z].items, desc = bills[z].discount, tax = bills[z].tax;
            console.log(' items : ', x);

            var rates = 0, totalRate = 0;

            for (var i = 0; i < x.length; i++) {

                rates += (x[i].rate * x[i].quantity);

                totalRate += x[i].rate;

                console.log(x[i].rate);

            }

            console.log('total1 : ', totalRate);


            var quantity = x[0].quantity;
            desc = totalRate*quantity*desc/100;
            tax = desc*tax/100;

            total += ( ( (totalRate * quantity) - desc ) + tax )

        }

        var tempTotal =  total.toFixed(2);

        return {
            total: tempTotal,
            avg: (tempTotal / bills.length).toFixed(2)
        };

    }


    $scope.showReport = function () {


        $http.get('/customer/' + $routeParams.id + '/get/report').then(function (res) {


            console.log(' report : ', res.data);
            if(res.data.bills.length > 0){

                var cst = res.data.customer;
                var bills = res.data.bills;
                console.log(res.data);
                var tempData = {
                    name: cst.name,
                    email: cst.email,
                    phone: cst.phone,
                    mobile: cst.mobile,
                    totalBills: bills.length
                };

                var temp = getAmount(bills, cst.discount, cst.tax);
                tempData.totalAmount = temp.total;
                tempData.avgAmount = temp.avg;
                $scope.reportData = tempData;
                console.log(' report  : ', tempData);
                
            }else{
                
                $scope.noBills = true;
            }


        })
        
    }
    

})
/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Edit customer
 * *************************************************************** */

app.controller('edit-customer-controller', function ($scope, $http, $routeParams, $location) {

    console.log(' id is : ', $routeParams.id);
    $scope.dateRegex = "/^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/";
    $scope.addresses = [];
    $scope.address = {};
    $scope.showAddressInput = true;

    $scope.isEdit = $routeParams.id;

    if($routeParams.id){

        $http.get('/customer/'+$routeParams.id+'/get').then(function (res) {

            $scope.customer = res.data;

            // var dob = new Date(res.data.dob);
            $scope.customer.dob = new Date(res.data.dob);

            $scope.customer.phone = parseInt(res.data.phone);
            $scope.customer.mobile = parseInt(res.data.mobile);
            $scope.addresses = $scope.customer.addresses;
            if($scope.customer.addresses.length > 0){
                $scope.showAddressInput = false;
            }
            console.log(res.data);

        })
    }


    $scope.addAddress = function (address) {

        console.log('address data : ', address);
        $scope.addresses.push(address);
        console.log('addresses : ', $scope.addresses);
        $scope.address = {};
        $scope.showAddressInput = false;

    }

    $scope.showAddress = function () {

        $scope.showAddressInput = true;

    }

    $scope.deleteAddress = function (index) {

        $scope.addresses.splice(index, 1);

    }

    $scope.submit = function (form, customerData, address) {
        
        if(form.$valid){

            console.log('form is valid  : ', customerData, address, $scope.addresses);

            if(address && address.flat && address.pin && address.state && address.street){
                $scope.addresses.push(address);
            }
            customerData.addresses = $scope.addresses;

            var api = $scope.isEdit ? '/customer/update' : '/customer/create';
            console.log(' api is : ', api, customerData);

            $http.post( api, customerData).then(function (res) {

                console.log('created user ang got res : ', res);
                $location.path('customer-details/'+res.data._id);


            }, function (err) {

                console.log(' errror : ', err);

            })


        }


        
    }
    
})
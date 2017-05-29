/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : initial file for routing & loading controller
 * *************************************************************** */
var app = angular.module('PosistAsignment', ['ngRoute', 'ngFileUpload', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {

            templateUrl: 'app/main/main.html',
            controller: 'main-controller'

        }).when('/bills', {

            templateUrl: 'app/bills/bills.html',
            controller: 'bills-controller'

        }).when('/customers', {

            templateUrl: 'app/customers/customers.html',
            controller: 'customers-controller'

        }).when('/edit-customer/:id', {

            templateUrl: 'app/customers/edit-customer/edit-customer.html',
            controller: 'edit-customer-controller'

        }).when('/create', {

            templateUrl: 'app/customers/edit-customer/edit-customer.html',
            controller: 'edit-customer-controller'

        }).when('/customer-details/:id', {

            templateUrl: 'app/customers/customer-details/customer-details.html',
            controller: 'customer-controller'

        }).otherwise({
        redirectTo : '/'
    })

    $locationProvider.html5Mode(true)


});


app.controller('main-controller', function ( $location) {

    $location.path('/customers')

});


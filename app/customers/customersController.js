/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Customer controller for filter & 
 * *************************************************************** */

app.controller('customers-controller', function ($scope, $http) {

    var pageNo = 0;
    var datalimit = 5;
    var dataLength = 0;
    $scope.filterBy = null;

    $scope.filterOptions = [

        {
            name : 'Name',
            value : 'name'
        },
        {
            name : 'Mobile No',
            value : 'mobile'
        },
        {
            name : 'Phone no',
            value : 'phone'
        },
        {
            name : 'DOB',
            value : 'dob'
        },
        {
            name : 'Address',
            value : 'addresses'
        }

    ]


    $scope.$watch('filterBy', function (n, o) {

        console.log(' filter by changed : ', n, o);
        if(n == 'dob'){
            $scope.inputType = 'date'
        }else if(n == 'name' || n =='addresses'){
            $scope.inputType = 'text'
        }else{
            $scope.inputType = 'number'
        }

    })

    $scope.searchUser = function (search) {

        console.log('sertch  : ', search);

        search = $scope.filterBy == 'dob' ? new Date(search) : search
        getCustomers(0, '/customers/get?'+$scope.filterBy+'='+search);

    }


    var getCustomers = function (no, url) {

        no = no ? no : pageNo;

        console.log(' url is : ', url);
        var api  = url ? url  :'/customers/get?page='+no;
        $http.get(api).then(function (res) {

            dataLength = res.data.length;
            console.log('dataLengthdataLength', dataLength);
                $scope.customers = res.data;


        }, function (err) {

            console.log('error whle fetchng the bils');

        })

    }


    getCustomers();
    $scope.goTo = function (way) {

        if(way == 1  && dataLength == datalimit){

            pageNo++;
            getCustomers(pageNo);

        }else if(way == 0 && pageNo > 0){

            pageNo--;
            getCustomers(pageNo);

        }

    }

    $scope.clearFilter = function () {

        $scope.searchText = '';
        getCustomers(0);

    }


})

/* * ************************************************************ 
 * Date: 27 May, 2017
 * Programmer: Rupak Kumar Srivastava <rupank.srivastava@gmail.com>
 * Description : Query customer related bills 
 * *************************************************************** */

app.controller('bills-controller', function ($scope, $http) {
    
    var pageNo = 0;
    var datalimit = 5;
    var dataLength = 0;
    $scope.init = function (no) {

        no = no ? no : pageNo;

        $http.get('/customers/bills/get?page='+no).then(function (res) {
            
             dataLength = res.data.length;
            if(res.data.length > 0){
                $scope.bills = res.data;
            }
            
        }, function (err) {
            
            console.log('error whle fetchng the bils');
            
        })
        
    }


    //getBills();
    $scope.goTo = function (way) {

        if(way == 1  && dataLength == datalimit){

            pageNo++;
            $scope.init(pageNo);

        }else if(way == 0 && pageNo > 0){

            pageNo--;
            $scope.init(pageNo);

        }

    }
    $scope.init();

})
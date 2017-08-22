var app = angular.module('WebApp');

app.controller('specialController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.message = 'Special';
    findAll();

    function findAll() {
        $http.get('/special')
            .success(function (data) {
                $scope.special = data;
                for (i = 0; i < $scope.special.length; i++) {
                    console.log("compare: " + $scope.special[i].dayid + " vs. " + new Date().getDay());
                    if ($scope.special[i].dayid == new Date().getDay() || $scope.special[i].dayid == -1) {
                        $scope.special[i].disabled = "";    
                    } else {
                        $scope.special[i].disabled = "disabled";
                    }
                     
                }
                console.log(data);
                    }
            )
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

        $scope.addToCartSpecial = function(sid, squantity) {
        console.log("TESTER");
        if (localStorage.getItem(sid) === null) {
            localStorage.setItem(sid.toString() ,squantity.toString()) 
            }
            else {
                soldQuantity = parseInt(localStorage.getItem(sid));
                snewQuantity = soldQuantity + squantity;
                localStorage.setItem(sid, snewQuantity.toString());
            }
        
         //window.alert("Item added to cart");
         $window.location.reload();
    }


}]);

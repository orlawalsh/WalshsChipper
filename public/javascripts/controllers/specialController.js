var app = angular.module('WebApp');

app.controller('specialController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Special';
    findAll();

    function findAll() {
        $http.get('/special')
            .success(function (data) {
                $scope.special = data;
                console.log(data);
            })
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
        }
         window.alert("Item Added");
    }


]);

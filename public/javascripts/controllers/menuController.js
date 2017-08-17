var app = angular.module('WebApp');

app.controller('menuController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Menu';
    findAll();

    function findAll() {
        $http.get('/menu')
            .success(function (data) {
                $scope.menu = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.addToCart = function(id, quantity) {
        //console.log("TESTER");
        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id.toString() ,quantity.toString()) 
            }
            else {
                oldQuantity = parseInt(localStorage.getItem(id));
                newQuantity = oldQuantity + quantity;
                localStorage.setItem(id, newQuantity.toString());
            }
        }
        //localStorage.setItem(id.toString() ,quantity.toString());
         window.alert("Item Added");
    }



]);

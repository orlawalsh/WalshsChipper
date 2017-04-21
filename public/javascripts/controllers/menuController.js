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

}]);

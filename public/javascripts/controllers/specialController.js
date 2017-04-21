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
    };

}]);

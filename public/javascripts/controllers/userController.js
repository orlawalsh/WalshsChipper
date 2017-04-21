var app = angular.module('WebApp');

app.controller('userController',['$scope', '$location', '$http', function($scope, $location, $http){

    $scope.formData = {};

    $scope.name = "";
    $scope.formData.email = "";
    $scope.formData.password = "";

    $scope.addUser = function(){
        $scope.formData.email = $scope.formData.email;
        $scope.formData.name = $scope.formData.name;
        $scope.formData.password = $scope.formData.password;
        $http.post('/', $scope.formData)
            .success(function(data) {
                $scope.users = data;
                $location.path('/');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

]);

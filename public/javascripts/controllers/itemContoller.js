var app = angular.module('WebApp');

app.controller('itemController', ['$scope', function($scope) {

    $scope.formData = {};

    $scope.name = "";
    $scope.formData.price = 0.00;
    $scope.options = [];

    $scope.formData.type = $scope.options[0];

}

]);

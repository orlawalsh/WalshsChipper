var app = angular.module('WebApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.ejs',
            controller  : 'mainController'
        })

        .when('/menu', {
            templateUrl : 'pages/menu.ejs',
            controller  : 'menuController'
        })

        .when('/special', {
            templateUrl : 'pages/special.ejs',
            controller  : 'specialController'
        })

        .when('/cart', {
            templateUrl : 'pages/cart.ejs',
            controller  : 'cartController'
        })

        .when('/register', {
            templateUrl : 'pages/signup.ejs',
            controller  : 'userController'
        })

    .when('/login', {
        templateUrl : 'pages/signin.ejs',
        controller  : 'userController'
    });
});



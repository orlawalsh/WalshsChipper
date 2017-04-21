var app = angular.module('WebApp');

app.controller('cartController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Your Cart';

    var cat = this;
    cat.getCartMenu = [];
    cat.GetAllMenu = GetAllMenu;
    cat.GetTotalMeunPrice = GetTotalMeunPrice;
    cat.GetTotalMenuCount = GetTotalMenuCount;
    cat.GetQuantityByName = GetQuantityByName;
    cat.AddToCart = AddToCart;
    cat.RemoveCartMenu = RemoveCartMenu;
    cat.cartMenu = {
        "Category" : "",
        "Price" : "",
        "Quantity" : "",
        "cartId" : ""
    };
}]);

//
//     (function initController(){
//         GetAllMenu();
//     })();
//
//     function GetAllMenu(){
//         clientShoppingCart.GetAllCartMenu()
//             .then(function(getMenu){
//                 if(getMenus !== null){
//
//                     cat.getCartMenus = getMenus;
//                 }
//             });
//     }
//
//
//     function GetTotalMenuPrice(){
//         return clientShoppingCart.GetTotalCartMenuPrice();
//     }
//
//     function GetTotalMenuCount(){
//         return clientShoppingCart.GetTotalCartMenuCount();
//     }
//
//     function GetQuantityByName(productName){
//         return clientShoppingCart.GetQuantityByName(productName);
//     }
//
//     function AddToCart(productName,quantity){
//         cat.cartMenu.productName = productName;
//         cat.cartMenu.productQuantity = quantity;
//
//         clientShoppingCart.AddCartMenu(cat.cartMenu)
//             .then(function(response){
//                 if(response.success){
//                     window.alert(response.message);
//                 }
//                 else{
//                     window.alert(response.message);
//                 }
//             });
//     }
//
//     function RemoveCartMenu(productName){
//         clientShoppingCart.RemoveCartMenu(productName)
//             .then(function(){
//                 GetAllProducts();
//             });
//     }
//
// });

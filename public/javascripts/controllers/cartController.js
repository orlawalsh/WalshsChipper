var app = angular.module('WebApp');

app.controller('cartController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Your Cart';

       function findOne(id, item) {
        $http.get('/menu/'+id)
            .success(function (data) {
                if (data.length > 0){
                item.name = data[0].category + ' - ' + data[0].name;
                item.totalPrice = item.quantity*data[0].price;
                console.log(data);
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

     function findOneSpecial(sid, sitem) {
        $http.get('/special/'+sid)
            .success(function (data) {
                if (data.length > 0){
                sitem.name = data[0].name + ' - ' + data[0].items;
                sitem.totalPrice = sitem.quantity*data[0].price;
                console.log("Adding special");
            }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    var cat = this;
    cat.getCartMenu = [];
    // cat.GetAllMenu = GetAllMenu;
    // cat.GetTotalMeunPrice = GetTotalMeunPrice;
    // cat.GetTotalMenuCount = GetTotalMenuCount;
    // cat.GetQuantityByName = GetQuantityByName;
    // cat.AddToCart = AddToCart;
    // cat.RemoveCartMenu = RemoveCartMenu;
    cat.cartMenu = {
        "Category" : "",
        "Price" : "",
        "Quantity" : "",
        "cartId" : ""
    };


    $scope.items=[];

    for(var i = 0; i <localStorage.length; i++){
        console.log("Adding Item");
        k = localStorage.key(i); //get menu id
        v = localStorage.getItem(k); // quantity(as a string)

        item = {};
        item.id = k;
        item.quantity = parseInt(v);
        findOne(item.id, item);
        findOneSpecial(item.id, item);
   

        $scope.items.push(item);
    }

//     $scope.reloadRoute = function() {
//    $window.location.reload();
// }

     $scope.addToCartMenu = function(id, quantity) {
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
         window.alert("Item Add");
    


}]);

//
    // function initController(){
    //     GetAllMenu();
    // })();

    // function GetAllMenu(){
    //     clientShoppingCart.GetAllCartMenu()
    //         .then(function(getMenu){
    //             if(getMenus !== null){

    //                 cat.getCartMenus = getMenus;
    //             }
    //         });
    // }

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
//     function RemoveCartMenu(productName){
//         clientShoppingCart.RemoveCartMenu(productName)
//             .then(function(){
//                 GetAllProducts();
//             });
//     }
//
// });

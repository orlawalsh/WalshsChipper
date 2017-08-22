var app = angular.module('WebApp');

var extScope;

app.controller('cartController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    extScope = $scope;
    $scope.message = 'Your Cart';
    $scope.total = 0;
    $scope.qty = 0;

       function findOne(id, item) {
        $http.get('/menu/'+id)
            .success(function (data) {
                if (data.length > 0){
                item.name = data[0].name;
                item.totalPrice = item.quantity*data[0].price;
                $scope.total=$scope.total+item.totalPrice;
                $scope.qty=$scope.qty+item.quantity;
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
                $scope.total=$scope.total+sitem.totalPrice;
                $scope.qty=$scope.qty+sitem.quantity;
                //sitem.menuitems= data[0].menus;
                console.log("Adding special");
            }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

         function findOneSpecialAsync(sid, f) {
        $http.get('/special/'+sid)
            .success(function (data) {
                if (data.length > 0){
                var sitem = {};
                sitem.name = data[0].name + ' - ' + data[0].items;
                sitem.totalPrice = data[0].price;
                sitem.menuitems= data[0].menus;
                f(sitem);
            }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }


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
    };

     $scope.addToCartMenu = function(id, quantity) {
        //console.log("TESTER");
        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id.toString() ,quantity.toString()) 
            }
            else {
                oldQuantity = parseInt(localStorage.getItem(id));
                newQuantity = oldQuantity + quantity;
                if (newQuantity > 0) {
                    localStorage.setItem(id, newQuantity.toString());
                } else {
                    localStorage.removeItem(id);
                }
                
            }
               //localStorage.setItem(id.toString() ,quantity.toString());
         //window.alert("Cart updated");
         $window.location.reload();
        };


 $scope.checkout = function(item) {
      alert("Order total: €" + $scope.total + "\n\nPayment received. Thanks.");
      $scope.items = [];
      $scope.total = 0;
      $scope.qty = 0;
      localStorage.clear();
    };

    $scope.clearOrder = function() {
      $scope.items = [];
      $scope.total = 0;
      $scope.qty = 0;
      localStorage.clear();
    };

//looking for complete match
        $scope.suggest1 = function(id, f){
            findOneSpecialAsync(id, function(sItem) {
                //console.log("****************" + sItem.menuitems);
            for (i = 0; i <sItem.menuitems.length; i++){

                mid = sItem.menuitems[i].mid;
                qty = sItem.menuitems[i].qty;
                itemCount = localStorage.getItem(mid);
                console.log("Checking " + mid + ": " + itemCount + " out of " + qty);
                if (itemCount == null ){
                    f(null);
                    return;
                } else if (itemCount < qty) {
                    f(null);
                    return;
                }
            }

            f({"id": id, "name": sItem.name, "price": sItem.totalPrice, "menuitems": sItem.menuitems});

            });
        };

//looking for a match - missing one item
        $scope.suggest2 = function(id, f){
            findOneSpecialAsync(id, function(sItem) {
                free = true;
                //console.log("****************" + sItem.menuitems);
            for (i = 0; i <sItem.menuitems.length; i++){

                mid = sItem.menuitems[i].mid;
                qty = sItem.menuitems[i].qty;
                itemCount = localStorage.getItem(mid);
                console.log("Checking " + mid + ": " + itemCount + " out of " + qty);
                if (itemCount == null ){
                    if (free == true && qty == 1) {

                        free = false;

                    } else {

                    f(null);
                    return;
                    }
                    
                } else if (itemCount < qty) {
                    if (free == true && qty == itemCount +1 ) {
                        free = false;

                    } else {
                        f(null);
                    return;
                    }
                    
                } 
            }

            f({"id": id, "name": sItem.name, "price": sItem.totalPrice, "menuitems": sItem.menuitems});

            });
        };

  $scope.makeDailySuggestion = function() {

    todaysSpecial = null;

    switch (new Date().getDay()) {
        case 1: todaysSpecial = "58e25216abc4401c04c57075";
        break;
        case 2: todaysSpecial = "58e25483abc4401c04c57076";
        console.log("TUESDAY");
        break;
        case 3: todaysSpecial = "58e254c5abc4401c04c57077";
        break;
        case 4: todaysSpecial = "58e25552abc4401c04c57078";
        break;
        case 5: todaysSpecial = "58e25657abc4401c04c5707a";
        break;
        case 6: todaysSpecial = "58e255a0abc4401c04c57079";
        break; 
    }

    dailySpecial = "58e256cdabc4401c04c5707b";

    if (todaysSpecial !== null) {
        $scope.suggest1(todaysSpecial, function(sItem){
            //console.log("special: " + sItem.id);
            if (sItem !== null) {
                 $scope.suggestion = sItem.id;
                 $scope.name = sItem.name;
                 $scope.price = sItem.price;
                 $scope.extraItem = "This does not change your order";
                 $scope.specialItem = sItem.menuitems;
            } else {
                $scope.suggest1(dailySpecial, function (sItem){
                    if (sItem !== null) {
                      $scope.suggestion = sItem.id;
                      $scope.name = sItem.name;
                      $scope.price = sItem.price;
                      $scope.extraItem = "This does not change your order";
                      $scope.specialItem = sItem.menuitems;
                    }
                });
            }
        });
    } else {
        $scope.suggest1(dailySpecial, function(sItem) {
            if (sItem !== null) {
                      $scope.suggestion = sItem.id;
                      $scope.name = sItem.name;
                      $scope.price = sItem.price;
                      $scope.extraItem = "This does not change your order";
                      $scope.specialItem = sItem.menuitems;
            }

        });
    }
    if ($scope.suggestion == null || $scope.suggestion == undefined) {



    if (todaysSpecial !== null) {
        $scope.suggest2(todaysSpecial, function(sItem){

            //console.log("special: " + sItem.id);
            if (sItem !== null) {
                 $scope.suggestion = sItem.id;
                 $scope.name = sItem.name;
                 $scope.price = sItem.price;
                 $scope.extraItem = "This will change your order";
                 $scope.specialItem = sItem.menuitems;
            } else {
                $scope.suggest2(dailySpecial, function (sItem){
                    if (sItem !== null) {
                      $scope.suggestion = sItem.id;
                      $scope.name = sItem.name;
                      $scope.price = sItem.price;
                      $scope.extraItem = "This will change your order";
                       $scope.specialItem = sItem.menuitems;
                    }
                });
            }
        });
    } else {
        $scope.suggest2(dailySpecial, function(sItem) {
            if (sItem !== null) {
                      $scope.suggestion = sItem.id;
                      $scope.name = sItem.name;
                      $scope.price = sItem.price;
                      $scope.extraItem = "This will change your order";
                       $scope.specialItem = sItem.menuitems;
            }

        });
    }
}


  };

  $scope.changeCart = function () {
   for (i = 0; i < $scope.specialItem.length; i++) {
    item = $scope.specialItem[i];
    itemCount = localStorage.getItem(item.mid);
    if (itemCount !== null) {
        itemCount = itemCount - item.qty;
        if( itemCount == "0" ) {
            localStorage.removeItem(item.mid);
        } else {
            localStorage.setItem(item.mid, parseInt(itemCount) - qty);
        }
    }
   }
   specialCount = localStorage.getItem($scope.suggestion);
   if (specialCount == null) {
    localStorage.setItem($scope.suggestion, "1");

   } else {
    localStorage.setItem($scope.suggestion, parseInt(specialCount) +1 );

   }
   $window.location.reload();

  }


  


  $scope.makeDailySuggestion();

}]);

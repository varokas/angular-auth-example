var app = angular.module("angular-auth-example", []);

app.factory('localDataStore', function($window) {
  return {
    put: function(key, value) { $window.localStorage.setItem(key,value); }
    get: function(key) { return $window.localStorage.getItem(key); }
    exist: function(key) { return get(key) != null; }
  };
});

app.factory('auth', function() {
  return {
    isLoggedIn: function() {
      return true;
    }
  };
});

app.controller("MainCtrl", function($scope, auth) {
  $scope.loginStatus = auth.isLoggedIn() ? "logged in" : "not logged in";


});

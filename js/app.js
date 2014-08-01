var app = angular.module("angular-auth-example", []);

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

var app = angular.module("angular-auth-example", []);

app.factory('localDataStore', function($window) {
  return {
    put: function(key, value) { $window.localStorage.setItem(key,value); },
    get: function(key) { return $window.localStorage.getItem(key); },
    has: function(key) { return $window.localStorage.getItem(key) != null; },
    remove: function(key) { return $window.localStorage.removeItem(key); }
  };
});

app.factory('auth', function(localDataStore) {
  var tokenKey = "token";

  return {
    hasToken: function() { return localDataStore.has(tokenKey); },
    saveToken: function(token) { localDataStore.put(tokenKey, token); },
    getToken: function() { return localDataStore.get(tokenKey); },
    removeToken: function() { localDataStore.remove(tokenKey); }
  };
});

app.constant('AUTH_EVENTS', {
  'unauthorized': 'AUTH_EVENTS::unauthorized'
});

app.factory('authInterceptor', function ($rootScope, auth, AUTH_EVENTS) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (auth.hasToken()) {
        config.headers.Authorization = 'Bearer ' + auth.getToken();
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        $rootScope.$broadcast(AUTH_EVENTS.unauthorized);
      }
      return response;
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

app.controller("MainCtrl", function($scope, auth) {
  $scope.loginStatus = auth.hasToken() ? "logged in" : "not logged in";


});

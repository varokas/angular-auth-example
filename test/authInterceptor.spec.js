function createInMemoryDataStore() {
  var kvStore = {};

  return {
    put: function(key, value) { kvStore[key] = value; },
    get: function(key) { return kvStore[key]; },
    has: function(key) { return kvStore.hasOwnProperty(key); },
    remove: function(key) { return delete kvStore[key]; }
  };
}

describe("authInterceptor", function() {
  var _authInterceptor;
  var _auth;

  var config = { "headers": {} };

  beforeEach(function() {
    module("angular-auth-example", function($provide) {
      $provide.value('localDataStore', createInMemoryDataStore())
    });

    inject(function(authInterceptor, auth) {
        _authInterceptor = authInterceptor;
        _auth = auth;
    });
  });

  it("should not add any header if there is no auth token", function() {
    var returnedConfig = _authInterceptor.request(config);

    expect(returnedConfig).toEqual({ "headers": {} });
  });

  it("should add token from dataStore", function() {
    _auth.saveToken("aSecretToken");
    var returnedConfig = _authInterceptor.request(config);

    expect(returnedConfig).toEqual({ "headers": { "Authorization" : "Bearer aSecretToken"} });
  });

  it("should add token from dataStore even config header is undefined", function() {
    _auth.saveToken("aSecretToken");
    var returnedConfig = _authInterceptor.request({});

    expect(returnedConfig).toEqual({ "headers": { "Authorization" : "Bearer aSecretToken"} });
  });
});

describe("httpProvider", function() {
  var httpProvider;

  //provider needs to be inject during config
  beforeEach(module("angular-auth-example", function($httpProvider) {
    httpProvider = $httpProvider;
  }));

  //Need to inject something, anything (even blank) for the $httpProvider to be injected
  it("getToken() call localDataStore.get() correctly", inject(function() {
     expect(httpProvider.interceptors).toContain('authInterceptor');
  }));

});

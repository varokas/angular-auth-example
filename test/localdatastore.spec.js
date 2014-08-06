describe("localDataStore", function() {
  var mockWindow;

  beforeEach(function() {
    mockWindow = {
      localStorage: jasmine.createSpyObj('localStorage', ['setItem', 'getItem', 'removeItem'])
    };

    module(function($provide) {
      $provide.constant('$window', mockWindow);
    });
  });
  beforeEach(module("angular-auth-example"));


  it("put() call localStorage.setItem correctly", inject(function(localDataStore) {
    localDataStore.put("key", "value");

    expect(mockWindow.localStorage.setItem).toHaveBeenCalledWith("key","value");
  }));

  it("get() call localStorage.getItem correctly", inject(function(localDataStore) {
    mockWindow.localStorage.getItem.and.returnValue("storedValue");
    var result = localDataStore.get("key");

    expect(mockWindow.localStorage.getItem).toHaveBeenCalledWith("key");
    expect(result).toBe("storedValue");
  }));

  it("has() is true when the key exists", inject(function(localDataStore) {
    mockWindow.localStorage.getItem.and.returnValue("someValue");
    expect(localDataStore.has("key")).toBe(true);
  }));

  it("has() is false when the key does not exists", inject(function(localDataStore) {
    mockWindow.localStorage.getItem.and.returnValue(null);
    expect(localDataStore.has("key")).toBe(false);
  }));

  it("remove() is calls to localStorage.removeItem", inject(function(localDataStore) {
    localDataStore.remove("key");

    expect(mockWindow.localStorage.removeItem).toHaveBeenCalledWith("key");
  }));
});

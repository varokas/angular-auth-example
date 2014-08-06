describe("auth", function() {
  beforeEach(module("angular-auth-example"));

  it("getToken() call localDataStore.get() correctly", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'get').and.returnValue('tokenValue');

    expect(auth.getToken()).toBe('tokenValue');
  }));

  it("hasToken() call localDataStore.has() correctly / true", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'has').and.returnValue(true);

    expect(auth.hasToken()).toBe(true);
  }));

  it("hasToken() call localDataStore.has() correctly / false", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'has').and.returnValue(false);

    expect(auth.hasToken()).toBe(false);
  }));

  it("saveToken() call localDataStore.put() correctly", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'put');

    auth.saveToken("tokenValue");

    expect(localDataStore.put).toHaveBeenCalledWith("token", "tokenValue");
  }));

  it("removeToken() call localDataStore.remove() correctly", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'remove');

    auth.removeToken();

    expect(localDataStore.remove).toHaveBeenCalledWith("token");
  }));
});

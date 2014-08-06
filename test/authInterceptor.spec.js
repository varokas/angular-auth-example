describe("authInterceptor", function() {
  beforeEach(module("angular-auth-example"));

  it("getToken() call localDataStore.get() correctly", inject(function(auth, localDataStore) {
    spyOn(localDataStore, 'get').and.returnValue('tokenValue');

    expect(auth.getToken()).toBe('tokenValue');
  }));
 
});

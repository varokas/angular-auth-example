var request = require('request');
var jwt = require('jsonwebtoken');

var secret_key = "SOME_SUPER_SECRET_STRING_ONLY_YOUR_APP_KNOWS";
var sample_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZXhwZWN0ZWRVc2VyIiwiaWF0IjoxNDA4MDAyMjcwLCJleHAiOjE0MDgwMjAyNzB9.N8gfaviqgpItfHhPxw45TKZf7X-Bi_9NWPEYPisaNk8";

var host = 'http://localhost:3000';
var loginPath = host + "/api/login";
var authCheckPath = host + "/api/authCheck";

describe("/api/login", function() {

  it("should respond with a token if login pass", function(done) {
    request.post(loginPath, function(error, response, body){
      var json = JSON.parse(body);

      expect(json.status).toBe("invalid");
      done();
    });
  });

  it("should respond with a token if login pass", function(done) {
    request.post(loginPath, {form:{username:'expectedUser', password:'expectedPassword'}}, function(error, response, body){
      var json = JSON.parse(body);

      expect(json.status).toBe("ok");
      jwt.verify(json.token, secret_key, function(err, decoded) {
        expect(decoded.user).toBe('expectedUser');
        done();
      });
    });
  });

});

describe("/api/authCheck", function() {

  it("should respond with a 401 if no auth", function(done) {
    request.get(authCheckPath, function(error, response, body){
      expect(response.statusCode).toBe(401);

      done();
    });
  });

  it("should respond with a 200 if header has correct Bearer", function(done) {
    request.get({
        'url': authCheckPath,
        'headers': {
          'Authorization' : 'Bearer ' + sample_token
        }
      }, function(error, response, body) {

        expect(response.statusCode).toBe(200);
        done();
    });
  });

  it("should respond with a 401 if token is wrong", function(done) {
    request.get({
        'url': authCheckPath,
        'headers': {
          'Authorization' : 'Bearer ' + 'somewrongtoken'
        }
      }, function(error, response, body) {

        expect(response.statusCode).toBe(401);
        done();
    });
  });

});
//
// /** mostly copied from express-jwt) */
//
// function UnauthorizedError (code, error) {
//   Error.call(this, error.message);
//   this.name = "UnauthorizedError";
//   this.message = error.message;
//   this.code = code;
//   this.status = 401;
//   this.inner = error;
// }
//
// app.get('/api/ping', function(req, res) {
//     if (req.headers && req.headers.authorization) {
//       var parts = req.headers.authorization.split(' ');
//       if (parts.length == 2) {
//         var scheme = parts[0];
//         var credentials = parts[1];
//
//         if (/^Bearer$/i.test(scheme)) {
//           token = credentials;
//         }
//       } else {
//         return next(new UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' }));
//       }
//     } else {
//       returnres.status(401).send();
//       //return next(new UnauthorizedError('credentials_required', { message: 'No Authorization header was found' }));
//     }
//
//     jwt.verify(token, options.secret, options, function(err, decoded) {
//       if (err) return next(new UnauthorizedError('invalid_token', err));
//
//       req.user = decoded;
//       next();
//     });
// });

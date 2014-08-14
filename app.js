var SHARED_SECRET = "SOME_SUPER_SECRET_STRING_ONLY_YOUR_APP_KNOWS";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

var jwt = require('jsonwebtoken');
var express_jwt = require('express-jwt');

app.post('/api/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if(username != 'expectedUser' && password != 'expectedPassword') {
    res.send({'status': 'invalid'})
  } else {
    var token = jwt.sign({'user':username}, SHARED_SECRET, { expiresInMinutes: 60*5 });
    res.json({'status': 'ok', 'token': token});
  }
});

app.get('/api/authCheck', express_jwt({secret: SHARED_SECRET}),
  function(req, res) {
    res.send("ok");
  }
);

app.listen(3000);
console.log("Listening at 3000...");

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

var axios = require('axios');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'dist')));
app.use('/components', express.static(path.join(__dirname, 'bower_components')));


app.get('/', function (req, res) {
  res.render('index')
});

app.post('/charge', function (req, res) {
  axios({
    method: 'post',
    url: 'https://api.sandbox.veritrans.co.id/v2/charge',
    data: req.body,
    headers: {
      'Authorization': ('Basic ' + (new Buffer('VT-server-f2fD8IAxDtYwEOTKWbtam9RY').toString('base64'))),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(function (response) {
      res.json(response.data)
    })
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), '0.0.0.0',function(){
  console.log('Express server listening on port ' + server.address().port)
})

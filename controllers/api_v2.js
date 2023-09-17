'use strict'

var express = require('express');
var path = require('path');

var apiv2 = express.Router();

apiv2.use(express.static(path.join(__dirname,'..', 'src')));

apiv2.get('/', function(req, res) {
  res.send('Hello from APIv2 root route.');
});

apiv2.get('/users', function(req, res) {
  res.send('List of APIv2 users.');
});

apiv2.get('/login', function(req, res) {
  res.render('login');
});

module.exports = apiv2;

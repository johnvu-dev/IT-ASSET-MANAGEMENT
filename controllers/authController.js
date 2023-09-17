'use strict'
/**
 * This function does:
 * + Handle routing
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */

/**
 * Module dependencies.
 */
const Employee = require('../models/employeeModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//var express = require('../..');
var express = require('express');
var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');


var apiv1 = express.Router();

var apiv1 = module.exports = express();

apiv1.use(express.static(path.join(__dirname,'..', 'src'))); //lấy về thư mục gốc
// middleware

apiv1.use(express.urlencoded({ extended: false }))
apiv1.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// Session-persisted message middleware

apiv1.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// dummy database

// var users = {
//   tj: { name: 'tj' }
// };

// var users = Employee
// // when you create a user, generate a salt
// // and hash the password ('foobar' is the pass here)

// hash({ password: 'foobar' }, function (err, pass, salt, hash) {
//   if (err) throw err;
//   // store the salt & hash in the "db"
//   users.tj.salt = salt;
//   users.tj.hash = hash;
// });

// Registration
apiv1.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    //const salt = bcrypt.genSaltSync(10);
    const salt = await bcrypt.genSalt(10);
    //console.log('s1: ' + password);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log('s2: ' + hashedPassword);
    await User.create({ username, password: hashedPassword });
    //res.send('User registered successfully.');
    res.redirect('back');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

// Authenticate using our plain-object database of doom!

// function authenticate(name, pass, fn) {
//   if (!module.parent) console.log('authenticating %s:%s', name, pass);
//   var user = users[name];
//   // query the db for the given username
//   if (!user) return fn(null, null)
//   // apply the same algorithm to the POSTed password, applying
//   // the hash against the pass / salt, if there is a match we
//   // found the user
//   hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
//     if (err) return fn(err);
//     if (hash === user.hash) return fn(null, user)
//     fn(null, null)
//   });
// }

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    
    res.redirect('/auth/login');
  }
}

// apiv1.get('/', function(req, res){
//   res.redirect('/login');
// });

apiv1.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

apiv1.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

apiv1.get('/login', function(req, res){
  res.render('login');
  
});

apiv1.get('/relogin', function(req, res){
  //res.redirect(path.join(__dirname,'/login'));
  //res.redirect('/'); //trả về trang root
  res.redirect('/auth/login');
});

// apiv1.post('/login', function (req, res, next) {
//   authenticate(req.body.username, req.body.password, function(err, user){
//     if (err) return next(err)
//     if (user) {
//       // Regenerate session when signing in
//       // to prevent fixation
//       req.session.regenerate(function(){
//         // Store the user's primary key
//         // in the session store to be retrieved,
//         // or in this case the entire user object
//         req.session.user = user;
//         req.session.success = 'Authenticated as ' + user.name
//           + ' click to <a href="/auth/logout">logout</a>. '
//           + ' You may now access <a href="/auth/restricted">/restricted</a>.';
//         console.log('Check here 1');
//         res.redirect('back');
//       });
//     } else {
//       req.session.error = 'Authentication failed, please check your '
//         + ' username and password.'
//         + ' (use "tj" and "foobar")';
//         console.log('Check here 2');
//       res.redirect('/auth/login');
//     }
//   });
// });

// Login
apiv1.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const match = await bcrypt.compare(password, user.password);

    if(match) {
        //login
        req.session.userId = user.id; // Store user ID in session
        req.session.success = 'Authenticated as ' + user.username
          + ' click to <a href="/auth/logout">logout</a>. '
          + ' You may now access <a href="/auth/restricted">/restricted</a>.';
        //res.send('Logged in successfully.');
        //res.redirect('back');
        res.redirect('/');
    } else {
        //return res.status(401).send('Invalid password.');
        req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
      res.redirect('/auth/login');
    }

    //...
    
  } catch (error) {
    res.status(500).send('Error logging in.');
    
    res.redirect('/auth/login');
  }
});

apiv1.post('/login2', function (req, res, next) {
  console.log('Check here');
});


// Registration view
apiv1.get('/register', (req, res) => {
  res.render('register');
});

module.exports = apiv1;

// /* istanbul ignore next */
// if (!module.parent) {
//   app.listen(3000);
//   console.log('Express started on port 3000');
// }

// controllers/ComponentsController.js
'use strict'
/**
 * This function does:
 * + Component handling
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */

/**
 * Module dependencies.
 */

const Components = require('../models/componentsModel');
const Categories = require('../models/categoriesModel');



var express = require('express');

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

apiv1.get('/', async function(req, res){
    try {
        if (req.session.userId) {
            //res.render('dashboard', { username: req.session.username });
            const Component = await Components.findAll();
            //console.log(task);
            res.render('components_index', { Component });
          } else {
            res.redirect('/auth/login');
          }
     
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
    
  });

apiv1.get('/add', async (req, res) => {
    try {
        if (req.session.userId) {
            //res.render('dashboard', { username: req.session.username });
            const Category = await Categories.findAll();
            //console.log(task);
            res.render('components_add', { Category });
            } else {
            res.redirect('/auth/login');
            }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

apiv1.post('/add', async (req, res) => {
    console.log(req.body);
    const { name, category_id } = req.body;
    try {
        await Components.create({ name, category_id });
        res.redirect('/components');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


apiv1.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const Component = await Components.findByPk(id);
        const Category = await Categories.findAll();
        
        if (Component) {
            res.render('components_edit', { Component, Category });
        } else {
            res.redirect('/components');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

apiv1.post('/edit/:id', async (req, res) => {
        const { id } = req.params;
        const { name, category_id } = req.body;
        //var values = req.body;
        try {
            // var condition = { where :{id} }; 
            // options = { multi: true };
            const Component = await Components.findByPk(id);
            if (Component) {
                await Component.update({ name, category_id }); //err at 20230922
                //await Category.update({ values, condition, options });
                res.redirect('/components');
            } else {
                res.redirect('/components');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
});

apiv1.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const Component = await Components.findByPk(id);
        if (Component) {
            await Component.destroy();
            res.redirect('/components');
        } else {
            res.redirect('/components');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
});


module.exports = apiv1;

// controllers/ticketsController.js
'use strict'
/**
 * This function does:
 * + Ticket handling
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */

/**
 * Module dependencies.
 */

const Tickets = require('../models/ticketsModel');
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
            const Accessory = await Tickets.findAll();
            //console.log(task);
            res.render('Tickets_index', { Accessory });
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
            res.render('Tickets_add', { Category });
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
    const { issue, category_id } = req.body;
    try {
        await Tickets.create({ issue, category_id });
        res.redirect('/tickets');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


apiv1.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        apiv1.use(express.static(path.join(__dirname,'../..', 'src'))); //lấy về thư mục gốc
        const Ticket = await Tickets.findByPk(id);
        const Category = await Categories.findAll();
        
        if (Ticket) {
            res.render('Tickets_edit', { Ticket, Category });
        } else {
            res.redirect('/tickets');
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
            const Ticket = await Tickets.findByPk(id);
            if (Ticket) {
                await Ticket.update({ name, category_id }); //err at 20230922
                //await Category.update({ values, condition, options });
                res.redirect('/tickets');
            } else {
                res.redirect('/tickets');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
});

apiv1.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const Ticket = await Tickets.findByPk(id);
        if (Ticket) {
            await Ticket.destroy();
            res.redirect('/tickets');
        } else {
            res.redirect('/tickets');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
});


module.exports = apiv1;

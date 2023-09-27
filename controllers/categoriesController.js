// controllers/categoriesController.js
'use strict'
/**
 * This function does:
 * + Category handling
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */

/**
 * Module dependencies.
 */

const Categories = require('../models/categoriesModel');
const CategoryTypes = require('../models/categoryTypeModel');


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
            const Category = await Categories.findAll();
            //console.log(task);
            res.render('categories_index', { Category });
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
            const CategoryType = await CategoryTypes.findAll();
            //console.log(task);
            res.render('categories_add', { CategoryType });
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
    const { name, category_type } = req.body;
    try {
        await Categories.create({ name, category_type });
        res.redirect('back');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


apiv1.get('/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const Category = await Categories.findByPk(id);
        if (Category) {
            res.render('categories_edit', { Category });
        } else {
            res.redirect('/categories');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// const categoryController = {
    // index: async (req, res) => {
    //     try {
    //         if (req.session.userId) {
    //             //res.render('dashboard', { username: req.session.username });
    //             const Category = await Categories.findAll();
    //             //console.log(task);
    //             res.render('categories_index', { Category });
    //           } else {
    //             res.redirect('/auth/login');
    //           }
         
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).send('An error occurred');
    //     }
    // },

    // addForm: (req, res) => {
    //     res.render('categories_add');
    // },
//     addForm: async (req, res) => {
//         try {
//             if (req.session.userId) {
//                 //res.render('dashboard', { username: req.session.username });
//                 const CategoryType = await CategoryTypes.findAll();
//                 //console.log(task);
//                 res.render('categories_add', { CategoryType });
//               } else {
//                 res.redirect('/auth/login');
//               }
         
//         } catch (error) {
//           console.error(error);
//           res.status(500).send('An error occurred');
//         }
//     },

//     add: async (req, res) => {
//         const { name, category_type } = req.body;
//         try {
//             await Categories.create({ name, category_type });
//             res.redirect('/categories');
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },

//     editForm: async (req, res) => {
//         const { id } = req.params;
//         try {
//             const Category = await Categories.findByPk(id);
//             if (Category) {
//                 res.render('categories_edit', { Category });
//             } else {
//                 res.redirect('/categories');
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },

//     edit: async (req, res) => {
//         const { id } = req.params;
//         const { name, category_type } = req.body;
//         //var values = req.body;
//         try {
//             // var condition = { where :{id} }; 
//             // options = { multi: true };
//             const Category = await Categories.findByPk(id);
//             if (Category) {
//                 await Category.update({ name, category_type }); //err at 20230922
//                 //await Category.update({ values, condition, options });
//                 res.redirect('/categories');
//             } else {
//                 res.redirect('/categories');
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },

//     delete: async (req, res) => {
//         const { id } = req.params;
//         try {
//             const Category = await Categories.findByPk(id);
//             if (Category) {
//                 await Category.destroy();
//                 res.redirect('/categories');
//             } else {
//                 res.redirect('/categories');
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     }
// };

module.exports = apiv1;

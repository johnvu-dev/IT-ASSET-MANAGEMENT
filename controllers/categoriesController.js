// controllers/categoriesController.js

const Categories = require('../models/categoriesModel');


const categoryController = {
    index: async (req, res) => {
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
    },

    // addForm: (req, res) => {
    //     res.render('add');
    // },

    // add: async (req, res) => {
    //     const { title, description } = req.body;
    //     try {
    //         await Task.create({ title, description });
    //         res.redirect('/task');
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // },

    // editForm: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const task = await Task.findByPk(id);
    //         if (task) {
    //             res.render('edit', { task });
    //         } else {
    //             res.redirect('/task');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // },

    // edit: async (req, res) => {
    //     const { id } = req.params;
    //     const { title, description } = req.body;
    //     try {
    //         const task = await Task.findByPk(id);
    //         if (task) {
    //             await task.update({ title, description });
    //             res.redirect('/task');
    //         } else {
    //             res.redirect('/task');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // },

    // delete: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const task = await Task.findByPk(id);
    //         if (task) {
    //             await task.destroy();
    //             res.redirect('/task');
    //         } else {
    //             res.redirect('/task');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }
};

module.exports = categoryController;

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

    addForm: (req, res) => {
        res.render('categories_add');
    },

    add: async (req, res) => {
        const { name, category_type } = req.body;
        try {
            await Categories.create({ name, category_type });
            res.redirect('/categories');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    editForm: async (req, res) => {
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
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const { name, category_type } = req.body;
        //var values = req.body;
        try {
            // var condition = { where :{id} }; 
            // options = { multi: true };
            const Category = await Categories.findByPk(id);
            if (Category) {
                await Category.update({ name, category_type }); //err at 20230922
                //await Category.update({ values, condition, options });
                res.redirect('/categories');
            } else {
                res.redirect('/categories');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

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

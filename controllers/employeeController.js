// controllers/employeeController.js

const Employee = require('../models/employeeModel');

const taskController = {
    index: async (req, res) => {
        try {
          const employees = await Employee.findAll();
          res.render('employee_index', { employees });
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
    },

    addForm: (req, res) => {
        res.render('add');
    },

    add: async (req, res) => {
        const { first_name, last_name} = req.body;
        try {
            await Employee.create({ first_name, last_name });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    editForm: async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Employee.findByPk(id);
            if (task) {
                res.render('edit', { task });
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const task = await Employee.findByPk(id);
            if (task) {
                await task.update({ title, description });
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Employee.findByPk(id);
            if (task) {
                await task.destroy();
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = taskController;

const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/taskController');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

// sequelize.sync().then(() => {
//     console.log('Database synced');
// });

app.get('/', taskController.index);
app.get('/add', taskController.addForm);
app.post('/add', taskController.add);
app.get('/edit/:id', taskController.editForm);
app.post('/edit/:id', taskController.edit);
app.get('/delete/:id', taskController.delete);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

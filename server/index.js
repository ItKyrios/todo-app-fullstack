const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = { id: Date.now(), text: req.body.text};
    todos.push(todo);
    res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
    res.status(204).json({ message: 'Todo deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
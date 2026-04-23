const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.send('CI/CD Working updated');
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: Date.now(),
        title
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: 'Task deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
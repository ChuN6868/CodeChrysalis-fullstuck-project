const express = require('express')
const cors = require('cors')

const app = express();
const port = 5000;

const knex = require('./db/knex')

app.use(cors());
app.use(express.json());

// serverとReactでのHello World用
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World from the server!' });
});

// DBからデータを取得して返すエンドポイント
app.get('/api/message', async (req, res) => {
    try {
        const message = await knex('messages').select('*')
        console.log(message)
        res.status(200).json(message);
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ error: 'Failed to get todos'})
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
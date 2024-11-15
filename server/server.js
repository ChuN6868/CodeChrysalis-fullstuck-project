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

// DBからデータを取得して返すエンドポイント。Hello World用
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

// 座席情報をDBに登録するエンドポイント
app.post('/api/register', async (req, res) => {
    try {
        console.log("aaa")
        const temp = "OK post API"
        const {seatNumber, userName} = req.body;
        console.log({seatNumber, userName})
        console.log(seatNumber)

        const result = await knex('seats')
            .where({ seat_number: seatNumber })
            .update({ user_name: userName });
        if (result > 0) {
            res.status(200).json({ message: 'Seat info updated successfully!' });
        } else {
            res.status(404).json({ error: 'Seat not found' })
        }
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ error: 'Failed to post API'})
    }
});

// DBから座席情報を取得して返すエンドポイント
app.get('/api/seatinfo', async (req, res) => {
    try {
        const result = await knex('seats').select('*').orderBy('seat_number', 'asc')
        console.log(result)
        res.status(200).json(result);
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ error: 'Failed to seat info'})
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
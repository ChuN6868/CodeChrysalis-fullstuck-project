const express = require('express')
const cors = require('cors')
// const path = require('path')

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
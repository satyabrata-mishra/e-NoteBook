const connect = require('./db');
const express = require('express');
const app = express();
var cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.get('/', (req, res) => {
    res.send("Route Doesn't Exists!!!");
})
app.listen(port, () => {
    console.log(`Server Started At ${port}`);
})
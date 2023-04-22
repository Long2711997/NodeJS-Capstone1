const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.listen(8080);

// const mysql = require('mysql2');
// // Connect to database
// const conn = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '1234',
//    port: 3307,
//    database: 'capstone1'
// });

const rootRouter = require('./routes/rootRoute');
app.use('/api', rootRouter);
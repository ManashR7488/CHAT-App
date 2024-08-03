const express = require('express');
require("dotenv").config();
const app = express();
const port = 8000 || process.env.PORT;

const ConnectDB = require('./config/db');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

ConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.send('Hello, World!');
});

app.use('/api/user', userRoutes);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}/`);
});
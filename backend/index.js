const express = require('express');
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000 || process.env.PORT;

const ConnectDB = require('./config/db');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const getUserRoutes = require('./routes/getUserRoutes');

ConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send('Hello, World!');
});

app.get("/api/admin", (req, res)=>{
    res.render('admin');
})
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/getuser', getUserRoutes);

app.get('/api/logout', (req, res)=>{
    res.clearCookie("token");
  res.status(200).json({message:"logout successfully"});
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}/`);
});
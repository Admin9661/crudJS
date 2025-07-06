const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const userRouter = require('./routers/router');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use(express.static(path.join(__dirname, 'public')));


require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
connection.on('open', () => {
    console.log("Successfully Connected...");
})


app.get('/', (req, res) => {
    res.send('<h1>Welcome to the User Management API</h1><p>Use the /user endpoint to manage users.</p><p>Use POSTMAN or other tool to test the API.</p>');
});

app.listen(PORT, () => {
    console.log('Server running on port ',PORT);
});
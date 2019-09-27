const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');

if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json({limit: "100kb"}))
const rateLimit = new RateLimit({
    windowMS: 1000 * 60 * 15,
    max: 100,
    delayMs: 0
});
app.use(rateLimit);
app.use(logger('dev'));

const uri = process.env.MONGO_CONNECT_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo database connection established succesfully');
});

const exercises = require("./routes/exercises");
const users = require("./routes/users");

app.use('/exercises', exercises);
app.use('/users', users);

app.use((req, res, next) => {
    let error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ msg: err.toString(), error: err});
    console.log(err);
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${server.address().port}`);
});
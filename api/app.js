const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const index = require('./routes/index');
const bundle = require('./routes/bundle');
const path = require('./routes/path');
const place = require('./routes/place');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(index);
app.use(bundle);
app.use(path);
app.use(place);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(res.locals);
    next(err);
});

module.exports = app;

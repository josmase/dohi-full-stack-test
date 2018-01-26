const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const index = require('./routes/index');
const bundle = require('./routes/bundle/bundle');
const path = require('./routes/path/path');
const place = require('./routes/place/place');

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
    if (err.validation) {
        err = handleValidationError(err.errors)
    } else if (err.notFound) {
        err = handleNotFoundError(err)
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(res.locals);
    next(err);
});

/**
 * Takes an array of validation errors and create a new error from the first validation error.
 * @param errors Array of validation errors
 * @return {Error} The new error built from the first error in validation errors.
 */
function handleValidationError(errors) {
    const {dataPath, message} = errors[0];
    let err = new Error(message);
    err.status = 400;
    err.path = dataPath;
    return err;
}

function handleNotFoundError(err) {
    const {name, id} = err;
    const formattedError = new Error(`${name} matching the id: ${id}, could not be found`);
    formattedError.status = 404;
    return formattedError;
}

module.exports = app;

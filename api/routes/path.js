const router = require('express').Router();
const database = require('../database');
const schemas = require('../schemas');

const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schemas.path);

/* DELETE path*/
router.delete('/path/:id', (req, res, next) => {
    database.deletePath(req.params.id)
        .then(deleted => {
            if (!deleted) {
                const err = new Error('Path not found: ' + req.params.id);
                err.status = 404;
                next(err);
            } else {
                res.send({})
            }
        })
        .catch(err => next(err))
});

/* UPDATE path*/
router.put('/path/:id', (req, res, next) => {
    if (!validate(req.body)) {
        next({validation: true, errors: validate.errors});
    } else {
        database.updatePath(req.body,req.params.id)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

module.exports = router;

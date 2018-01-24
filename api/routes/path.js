const router = require('express').Router();
const database = require('../database');
const schemas = require('../schemas');

const Ajv = require('ajv');
const ajv = new Ajv();
ajv.addSchema(schemas.pathSchema, schemas.pathSchema.id);
ajv.addSchema(schemas.placeSchema, schemas.placeSchema.id);
const validate = ajv.compile(schemas.paths);

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
router.put('/path/', (req, res, next) => {
    if (!validate(req.body)) {
        next({validation: true, errors: validate.errors});
    } else {
        database.updatePaths(req.body)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

module.exports = router;

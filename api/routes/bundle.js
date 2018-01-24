const router = require('express').Router();
const database = require('../database');
const schemas = require('../schemas');

const Ajv = require('ajv');
const ajv = new Ajv();
ajv.addSchema(schemas.pathSchema, schemas.pathSchema.id);
ajv.addSchema(schemas.placeSchema, schemas.placeSchema.id);
const validate = ajv.compile(schemas.bundleSchema);

/* GET bundles. */
router.get('/bundle/', (req, res, next) => {
    database.getBundles(null)
        .then(data => res.send(data))
        .catch(err => next(err))
});

/* GET bundle. */
router.get('/bundle/:id', (req, res, next) => {
    database.getBundles(req.params.id)
        .then(data => res.send(data))
        .catch(err => next(err))
});
/* DELETE bundle */
router.delete('/bundle/:id', (req, res, next) => {
    database.deleteBundle(req.params.id)
        .then(deleted => {
            if (!deleted) {
                const err = new Error('Bundle not found: ' + req.params.id);
                err.status = 404;
                next(err);
            } else {
                res.send({})
            }
        })
        .catch(err => next(err))
});

/* CREATE bundle */
router.post('/bundle/', (req, res, next) => {
    if (!validate(req.body)) {
        handleValidationError(validate.errors, next)
    } else {
        database.createBundle(req.body)
            .then(data => res.send({id: data}))
            .catch(err => next(err))
    }
});

/* UPDATE bundle*/
router.put('/bundle/', (req, res, next) => {
    if (!validate(req.body)) {
        handleValidationError(validate.errors, next)
    } else {
        database.updateBundle(req.body)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

function handleValidationError(errors, next) {
    const {dataPath, message} = errors[0];
    let err = new Error(message);
    err.status = 400;
    err.path = dataPath;
    next(err)
}

module.exports = router;

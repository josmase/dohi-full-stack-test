const router = require('express').Router();
const database = require('../database');
const schemas = require('../schemas');

const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schemas.bundle);

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
        next({validation:true,errors:validate.errors});
    } else {
        database.createBundle(req.body)
            .then(data => res.send({id: data}))
            .catch(err => next(err))
    }
});

/* UPDATE bundle*/
router.put('/bundle/:id', (req, res, next) => {
    if (!validate(req.body)) {

    } else {
        database.updateBundle(req.body,req.params.id)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

module.exports = router;

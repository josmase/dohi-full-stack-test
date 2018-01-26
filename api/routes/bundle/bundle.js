const router = require('express').Router();
const bundle = require('./bundle.database.js');
const schema = require('./bundle.schema.js').schema;

const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schema);

/* GET bundles. */
router.get('/bundles/', (req, res, next) => {
    bundle.gets(null)
        .then(data => res.send(data))
        .catch(err => next(err))
});

/* GET bundle. */
router.get('/bundle/:id', (req, res, next) => {
    bundle.gets(req.params.id)
        .then(data => res.send(data))
        .catch(err => next(err))
});
/* DELETE bundle */
router.delete('/bundle/:id', (req, res, next) => {
    bundle.remove(req.params.id)
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
        next({validation: true, errors: validate.errors});
    } else {
        bundle.create(req.body)
            .then(data => res.send({id: data}))
            .catch(err => next(err))
    }
});

/* UPDATE bundle*/
router.put('/bundle/:id', (req, res, next) => {
    if (!validate(req.body)) {

    } else {
        bundle.update(req.body, req.params.id)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

module.exports = router;

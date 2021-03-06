const router = require('express').Router();
const path = require('./path.database.js');
const schema = require('./path.schema.js').schema;

const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schema);

/* DELETE path*/
router.delete('/path/:id', (req, res, next) => {
    path.remove(req.params.id)
        .then(deleted => {
            if (!deleted) {
                next({notFound: true, name: 'Path', id: req.params.id})
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
        path.update(req.body, req.params.id)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

/* CREATE path */
router.post('/path/:bundleId', (req, res, next) => {
    if (!validate(req.body)) {
        next({validation: true, errors: validate.errors});
    } else {
        path.create(req.body, req.params.bundleId)
            .then(data => res.send({id: data}))
            .catch(err => next(err))
    }
});

/* GET path */
router.get('/path/:id', (req, res, next) => {
    path.get(req.params.id)
        .then(data => {
            if (data.length === 0) {
                next({notFound: true, name: 'Path', id: req.params.id})
            } else {
                res.send(data)
            }
        })
        .catch(err => next(err))
});


/* GET paths. */
router.get('/paths/:bundleId', (req, res, next) => {
    path.gets(req.params.bundleId)
        .then(data => {
            if (data.length === 0) {
                next({notFound: true, name: 'Paths', id: req.params.bundleId})
            } else {
                res.send(data)
            }
        })
        .catch(err => next(err))
});

module.exports = router;

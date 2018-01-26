const router = require('express').Router();
const place = require('./place.database.js');
const schema = require('./place.schema.js').schema;


const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schema);
/* DELETE path*/
router.delete('/place/:id', (req, res, next) => {
    place.remove(req.params.id)
        .then(deleted => {
            if (!deleted) {
                const err = new Error('Place not found: ' + req.params.id);
                err.status = 404;
                next(err);
            } else {
                res.send({})
            }
        })
        .catch(err => next(err))
});

/* UPDATE path*/
router.put('/place/:id', (req, res, next) => {
    if (!validate(req.body)) {
        next({validation: true, errors: validate.errors});
    } else {
        place.update(req.body, req.params.id)
            .then(data => res.send(data))
            .catch((err) => next(err))
    }
});

/* CREATE path */
router.post('/place/:pathId', (req, res, next) => {
    if (!validate(req.body)) {
        next({validation: true, errors: validate.errors});
    } else {
        place.create(req.body,req.params.pathId)
            .then(data => res.send({id: data}))
            .catch(err => next(err))
    }
});

module.exports = router;

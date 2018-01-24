const router = require('express').Router();
const database = require('../database');
const validator = require('../validator');

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
        .then(data => {
            if (data.affectedRows === 0) {
                const err = new Error('Bundle not found: ' + req.params.id);
                err.status = 404;
                next(err);
            } else {
                res.send(data)
            }
        })
        .catch(err => next(err))
});

/* CREATE bundle */
router.post('/bundle/', (req, res, next) => {
    validator.validate(req.body)
        .then(() => {
            return database.createBundle(req.body)
        })
        .then(data => res.send({id: data}))
        .catch(err => next(err))
});

/* UPDATE bundle*/
router.put('/bundle/', (req, res, next) => {
    validator.validate(req.body)
        .then(() => {
            return database.updateBundle(req.body)
        })
        .then(data => res.send(data))
        .catch((err) => next(err))
});


module.exports = router;

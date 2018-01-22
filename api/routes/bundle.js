const router = require('express').Router();
const database = require('../database');

/* GET bundles. */
router.get('/bundle/', (req, res) => {
    database.getBundles()
        .then(data => res.send(data))
        .catch(err => next(err))
});

/* GET bundle. */
router.get('/bundle/:id', (req, res) => {
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

module.exports = router;

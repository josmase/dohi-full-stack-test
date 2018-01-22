const router = require('express').Router();
const database = require('../database');

/* GET bundles. */
router.get('/bundle/', (req, res) => {
    database.getBundles()
        .then(data => res.send(data))
        .catch(err => {
            throw new Error(err)
        })
});

/* GET bundle. */
router.get('/bundle/:id', (req, res) => {
    database.getBundles(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            throw new Error(err)
        })
});
/* DELETE bundle */
router.delete('/bundle/:id', (req, res) => {
    database.deleteBundle(req.params.id).then(data => res.send(data.affectedRows))
});

module.exports = router;

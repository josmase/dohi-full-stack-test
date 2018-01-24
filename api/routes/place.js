const router = require('express').Router();
const database = require('../database');

/* DELETE path*/
router.delete('/place/:id', (req, res, next) => {
    database.deletePlace(req.params.id)
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

module.exports = router;

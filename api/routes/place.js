const router = require('express').Router();
const database = require('../database');

/* DELETE path*/
router.delete('/place/:id', (req, res, next) => {
    database.deletePlace(req.params.id)
        .then(data => {
            if (data.affectedRows === 0) {
                const err = new Error('Path not found: ' + req.params.id);
                err.status = 404;
                next(err);
            } else {
                res.send(data)
            }
        })
        .catch(err => next(err))
});

module.exports = router;

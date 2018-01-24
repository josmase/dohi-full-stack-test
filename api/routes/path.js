const router = require('express').Router();
const database = require('../database');

/* DELETE path*/
router.delete('/path/:id', (req, res, next) => {
    database.deletePath(req.params.id)
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

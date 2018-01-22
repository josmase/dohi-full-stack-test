const router = require('express').Router();

/* GET bundle. */
router.get('/bundle/:id', (req, res) => {
    res.send(req.params.id);
});

module.exports = router;

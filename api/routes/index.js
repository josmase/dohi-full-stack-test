const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.redirect('/bundles')
});


module.exports = router;

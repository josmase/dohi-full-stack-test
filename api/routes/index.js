const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send("index")
});


module.exports = router;

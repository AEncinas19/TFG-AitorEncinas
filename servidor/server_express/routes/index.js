
const express = require('express');
const router = express.Router();

const userApi = require('../api/user');
const sessionApi = require('../api/session');
const shopApi = require('../api/shop');
const { session } = require('passport');

//-----------------------------------------------------------

// Debug trace.
router.all('*', function(req, res, next) {

    console.log("=== API ===>", req.url);
    next();
});


// Routes for the users resource.
router.post('/register',
    userApi.register);

router.post('/autenticate',
    sessionApi.create,
    sessionApi.createLoginExpires);

router.post('/location',
    sessionApi.checkLoginExpires,
    shopApi.findshop);

router.post('/backlocation',
    sessionApi.checkLoginExpires,
    shopApi.findBackgroundshop);

router.post('/pushtoken',
    sessionApi.checkLoginExpires,
    userApi.insertpush);

router.post('/logout',
    sessionApi.destroy);

router.post('/pay',
    sessionApi.checkLoginExpires,
    shopApi.makePayment);

router.get('/getshops',
    sessionApi.checkLoginExpires,
    shopApi.getShopsPosition);


// If I am here, then the requested route is not defined.
router.all('*', function(req, res, next) {

    var err = new Error('Ruta API no encontrada');
    err.status = 404;
    next(err);
});

//-----------------------------------------------------------

// Error
router.use(function(err, req, res, next) {

    var emsg = err.message || "Error Interno";

    console.log(emsg);

    res.status(err.status || 500)
        .send({error: emsg})
        .end();
});

//-----------------------------------------------------------

module.exports = router;

//-----------------------------------------------------------

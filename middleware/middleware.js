var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
  });


router.use('/registroUsuario', [check('email').isEmail(),
    check('password').isLength({ min: 6 }).isAlphanumeric()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

router.use('loginUsuario', [check('email').isEmail(),
    check('password').isLength({ min: 6 }).isAlphanumeric()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

router.use('/actualizarUsuario/:email', check('email').isEmail(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

router.use('/getDatosUsuario/:email', check('email').isEmail(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

router.use('/registroLenguaje', check('anocreacion').isDate(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

router.use('/actualizarLenguaje/:id', check('anocreacion').isDate(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
});

module.exports = router;
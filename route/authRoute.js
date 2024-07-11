const { signup, login } = require('../controller/authController');

const router = require('express').Router();


router.route('/register').post(signup);
router.route('/login').post(login);
router.route('/:id').get(login);


module.exports = router;
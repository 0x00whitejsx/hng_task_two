const { signup, login, getUserDetail } = require('../controller/authController');

const router = require('express').Router();



router.route('/:id').get(getUserDetail);


module.exports = router;
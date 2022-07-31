const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const authController = require("../controllers/auth");

router.post('/api/register', authController.register);
/**
 * Method for create a new user on BookList.
 * Http type request - POST
 * @param {string} username - Username unique indicator.
 * @param {string} password - Password for BookList website.
 * @param {string} email - Unique email address for the account.
*/
router.post('/api/login', authController.login);
/**
 * Method for get authorized.
 * Http type request - POST
 * @param {string} username - Username unique indicator.
 * @param {string} password - Password for BookList website.
*/
router.post('/api/auth', authController.auth);
/**
 * Method for check auth
 * No @param
*/





router.get('/api/logout', authController.logout)


module.exports = router;
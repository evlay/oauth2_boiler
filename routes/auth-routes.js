// Create an instance of the express router to be imported to app.js
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    // scope is what we want to retrieve from the user's profile like email, name, profile, contacts, etc.
    scope: ['profile']
}) )

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
})

module.exports = router;

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport.setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Setup view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

//Init passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongo
mongoose.connect(keys.mongoDB.dbURI, { useNewUrlParser: true }, () => {
    console.log('MongoDB connected')
});

// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
})

app.get('/')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
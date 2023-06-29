const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connection');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize())
//  Init passport on every route call.
app.use(passport.session())
//  Allow passport to use "express-session"
app.use(bodyParser.urlencoded({ extended: true })).use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    next();
}).use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accesToken, refreshToken, profile, done) {
    //  User.findOrCreate({ githunid: profile.id }, function (err, user) {
        return done(null, profile);
    // })
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.databaseConnecting((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Web service is listening at port ${port}`);
    }
});
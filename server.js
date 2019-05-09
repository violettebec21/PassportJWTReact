// Requiring necessary npm packages
const express = require('express');
const Cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const app = express(); 
const db = require("./models");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
// const db = require("./models");

console.log("hi!");

// Requiring passport as we've configured it
require("./config/passport");

// Creating express app and configuring middleware needed for authentication
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

// Requiring our routes
require('./routes/auth-routes')(app);
require('./routes/passport-routes')(app);
//

// Syncing our database and logging a message to the user upon success

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});

module.exports= app;

const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt-nodejs');
const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  {User} = require('../models'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'local-login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      console.log(email, password);
      try {
        User.findOne({
          where: {
            // username: username,
            email: email,
          },
        }).then(user => {
          if (user != null) {
            console.log('username already taken');
            return done(null, false, { message: 'username already taken' });
          } else {
            console.log(password);
            // bcrypt.hash(password, (err, hashedPassword) => {
            //   console.log(err);
            //   console.log(hashedPassword);
              User.create({ email, password }).then(user => {
                console.log('user created');
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user);
              })
              .catch(err => {
                console.log(err);
              })
            // })
            .catch(err => {
              console.log(err);
            })
          }
        });
      } catch (err) {
        console.log(err);
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      // emailField: 'email',
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      console.log("In local strategy!");
      // console.log(username,password,done);
      try {
        User.findOne({
          where: {
            // email: email,
            username: username,
          },
        }).then(user => {
          // console.log("here is the user password:", user.password)
          if (user === null) {
            // console.log('got into .then');
            return done(null, false, { message: 'bad username' });
          } else {
            // console.log("inside the Else before bcrypt", bcrypt.compare);
            bcrypt.compare(password, user.password, function(err,res){
              if(err){
                console.error(err);
              } else {
                console.log("passwords match!");
                return true;
              }
            })//.then(response => {
        //       console.log("This is the bcrypt response:", response);
        //       if (response !== true) {
        //         console.log('passwords do not match');
        //         return done(null, false, { message: 'passwords do not match' });
        //       }
        //       console.log('user found & authenticated');
        //       // note the return needed with passport local - remove this return for passport JWT
        //       return done(null, user);
        //     });
          }
        })
      } catch (err) {
        console.log("Here is the error:", err);
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
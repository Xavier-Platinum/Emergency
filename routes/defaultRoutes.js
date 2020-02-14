const express = require("express");
const router = express.Router();
/* ============================>
IMPORTING THE ROUTE CONTROLLERS
<==============================*/
const defaultControllers = require("../Controllers/defaultControllers");
const passport = require("passport");
const localStrategy = require("passport-local");
const { Store } = require("../models/store");
const bcrypt = require("bcryptjs");
const config = require("../config/configuration");



/* ==============>
HOME ROUTE
<=================*/ 
router.get("/", defaultControllers.index),

/* ===================
REGISTER ROUTE 
=================== */
router.route("/register").get(defaultControllers.registerGet).post(defaultControllers.registerPost)

// login route poassport validation
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      await store.findOne({ email: email }).then(async store => {
        //passing in one parameter to remove parenthesis
        if (!store) {
          return done(
            null,
            false,
            req.flash(
              "error-message",
              "No Account is Registered with This Number"
            )
          );
        }
        if (!store.active) {
          return done(
            null,
            false,
            req.flash("error-message", "Please Try Again")
          );
        }

        await bcrypt.compare(
          password,
          store.password,
          (err, passwordMatched) => {
            if (err) {
              return err;
            }

            if (!passwordMatched) {
              return done(null, false, req.flash("Invalid passsword"));
            }
            return done(
              null,
              false,
              req.flash("success-message", "Login Successful!!!")
            ); //add change false to store
          }
        );
      });
    }
  )
);

// determining which data of the store obeject should be saved in the session
passport.serializeUser((store, done) => {
  done(null, store.id);
});

// using the store data 'store.id' from 'SterilizeUser' to get entire object
passport.serializeUser(async (id, done) => {
  try {
    const store = await Store.findById(id);
    done(null, store);
  } catch (error) {
    done(error, null);
  }
});

// login Route
router
  .route("/login")
  .get(defaultControllers.loginGet)
  //
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: true,
      session: true
    }),
    defaultControllers.loginPost
  );

module.exports = router; 
// module.exports = router; 
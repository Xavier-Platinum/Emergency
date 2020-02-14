module.exports = {
  /* =======================
  DATABASE URL
  ==========================*/
  mongoDB: "mongodb://localhost/Emergencies",

  // Online Db
  // mongoDB: "mongodb+srv://Logistics:logistic12@logistics-zog6f.mongodb.net/test?retryWrites=true&w=majority",
  /*===========================
  SERVER PORT
  =============================*/
  PORT: process.env.PORT || 4000,
  /* =============================
  GLOBAL VARIABLES DECLARATION
  ==============================*/
  globalvariables: (req, res, next) => {
    res.locals.success_message = req.flash("success-message");
    res.locals.error_message = req.flash("error-message");
    res.locals.messages = require("express-messages");
    res.locals.session = req.session;

    next();
  }
  
}
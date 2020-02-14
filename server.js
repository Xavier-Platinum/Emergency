// requiring express
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash")
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/configuration");

const app = express();

/*  =========================
CONFIGURING EXPRESS
========================= ==*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ASSIGNING MONGOOSE PROMISE LIBRARY
mongoose.Promise = global.Promise;
/* =======================
CONFIGURING MONGOOSE TO CONNECT TO DB
==========================*/
mongoose.connect(config.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(response => console.log(`Database Connected Seccuessfully at ${config.mongoDB}`))
.catch(err => console.log(`Database Connection Error ${err}`));

/* ==========================
CONFIGURING OTHER MIDDLEWARES
============================*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* ==============================
SETTING UP SESSIONS
=================================*/
app.use(
  session({
    secret:
      "momowkoq90942mdwck;a.m;qwx qw12304093-0qwkd;amc;xzc wec z zxcwq[capodq3rqfoc,awdqw4-9302393[das,ca",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 } //Expiration time is in millisecs
  })
);

/*========================
CONNECTING STATIC FILES 
=========================*/
app.use(express.static(path.join(__dirname, "public")));

/*========================
SETTING UP TEMPLATE ENGINE EJS
========================*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*======================
LOGGER INIT
===========================*/

app.use(logger("dev"));

// connect flash init 
app.use(flash());

// making use of global variables
app.use(config.globalvariables); 

/*========================
ROUTES GROUPING
========================*/

const defaultRoutes = require("./routes/defaultRoutes");
// HOME ROUTES
app.use("/", defaultRoutes);

/* ==================================
ADMIN ROUTES 
=================================*/
// app.get('/admin', (req, res) => {
//   res.send('Hello World')
// })
const adminRoutes = require("./routes/adminRoutes");
app.use("/dashboard", adminRoutes)
// const adminRoutes = require("./routes/adminRoutes");
// app.use("/admin", adminRoutes);{{/each}}

/* =======================<
ERROR HANDLING
>=========================*/

app.use((req, res, next) => {
  let pageTitle = "Error";
  let pageHeading = "Error";
  res.render("error404", { pageTitle, pageHeading });
  next();
});

app.listen(config.PORT, () => {
  console.log(`Server is Listening at ${config.PORT}`);//${req.headers.host}
});

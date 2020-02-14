const express = require("express");
const router = express.Router();
const path = require("path");

// const admin = require("../models/admin")
// const store = require("../models/emergency")




// IMPORTING TH ROUTE CONTROLLERS 
const adminControllers = require("../Controllers/adminControllers");

// routing 
router.get("/", adminControllers.dashboard )

// profile route 
router.get("/users", adminControllers.users) 

// units routes 
router.get("/units", adminControllers.units)

// Agencies Route
router.get(("/agencies", adminControllers.agencies))

// Location Route 
router.get("/location", adminControllers.location)


module.exports = router; 
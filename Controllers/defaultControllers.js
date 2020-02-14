const randomString = require("randomstring");
const Store = require("../models/store")
const config = require('../config/send_sms')
accountSid = config.TWILIO_SID
authToken = config.TWILIO_AUTHTOKEN
const client = require("twilio")(accountSid, authToken);
const bcrypt = require("bcryptjs")
// const emergency = require("../models/store");
// const emrID = () =>{
//  const you = "Emr" + randomString.generate({ length: 4, charset: "numeric" }) + randomString.generate({ length: 4, charset: "alphabetic" })
//  console.log(you)
// }

// let me = emrID()
// console.log(me)

module.exports = {
  index: (req, res) => {
    let pageHeading = "Home";
    let pageTitle = "Home";
    res.render("index", { pageTitle, pageHeading });
  },
  registerGet: (req, res) => {
    let pageHeading = "Register";
    let pageTitle = "Register";
    
    // console.log(emergency.emrID)
    res.render("register", { pageTitle, pageHeading });
  },
  registerPost: async (req, res) => {
    await Store.findOne({ phone: req.body.phone}).then(async store => {
      if (store) {
        req.flash("error-message", "Sorry!! Phone Number Already Registered"); 
        console.log("Number already registered")
        return res.redirect("/register");
      }
      if (req.body.password1 !== req.body.password2 ) {
        req.flash("error", "Password Mismatch")
        res.redirect("/register")
        return
      } else {
        const newStore = await new Store({
          // emrID: emrID,
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          phone: req.body.phone, 
          address: req.body.address,
          password1: req.body.password1
        });
        console.log(`Message: ${newStore}`);

        // bcrypt hashing 
        await bcrypt.genSalt(10, async(err, salt) => {
          await bcrypt.hash(newStore.password1, salt, async(err, hash) => {
            newStore.password1 = hash;
            
            console.log(`Hashed Password ${newStore}`);
            
            await newStore.save().then(user =>{
              client.messages
                .create({
                  body: `Your Registration to E-Response was Successful. Please Do Not Resend.`, 
                  from: "+18329254018",
                  to: "+2348163252713"
                  // to: `${req.body.phoneNo}`
                })
            })

          })
        })
        
        // const customerCare = "08163252713"
        req.flash("success-message", "Your Registration to E-Response was Successful");
        res.redirect("/"); 
      }
    })
  },
  // login route
  loginGet: (req, res) => {
    let pageTitle = "Login";
    let pageHeading = "Login";
    res.render("login", { pageTitle, pageHeading })
  },
  loginPost: (req, res) => {

    console.log("Users Login: ", req.body)
    req.flash("success-message", "You Were Successfully Logged in!!!")
  }
};
